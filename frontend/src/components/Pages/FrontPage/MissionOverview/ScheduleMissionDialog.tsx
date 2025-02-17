import {
    Autocomplete,
    Button,
    Card,
    Dialog,
    Typography,
    Popover,
    Icon,
    CircularProgress,
} from '@equinor/eds-core-react'
import styled from 'styled-components'
import { useLanguageContext } from 'components/Contexts/LanguageContext'
import { Icons } from 'utils/icons'
import { useRef, useState, useEffect } from 'react'
import { useInstallationContext } from 'components/Contexts/InstallationContext'
import { CreateMissionButton } from './CreateMissionButton'
import { Robot } from 'models/Robot'
import { EchoMissionDefinition } from 'models/MissionDefinition'

interface IProps {
    robotOptions: Array<Robot>
    echoMissionsOptions: Array<string>
    onChangeMissionSelections: (missions: string[]) => void
    onSelectedRobot: (robot: Robot) => void
    onScheduleButtonPress: () => void
    fetchEchoMissions: () => void
    scheduleButtonDisabled: boolean
    frontPageScheduleButtonDisabled: boolean
    selectedMissions: EchoMissionDefinition[]
    isFetchingEchoMissions: boolean
}

const StyledMissionDialog = styled.div`
    display: flex;
    justify-content: space-between;
`
const StyledAutoComplete = styled(Card)`
    display: flex;
    justify-content: center;
    padding: 8px;
    gap: 25px;
`
const StyledMissionSection = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: 0;
    gap: 10px;
`
const StyledLoading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3rem;
    gap: 1rem;
`
const StyledDialog = styled(Dialog)`
    display: flex;
    padding: 1rem;
    width: 320px;
`

export const ScheduleMissionDialog = (props: IProps): JSX.Element => {
    const { TranslateText } = useLanguageContext()
    const { installationCode } = useInstallationContext()
    const [isScheduleMissionDialogOpen, setIsScheduleMissionDialogOpen] = useState<boolean>(false)
    const [isEmptyEchoMissionsDialogOpen, setIsEmptyEchoMissionsDialogOpen] = useState<boolean>(false)
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
    const [isScheduleMissionsPressed, setIsScheduleMissionsPressed] = useState<boolean>(false)
    const anchorRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (!props.isFetchingEchoMissions && isScheduleMissionsPressed) {
            if (props.echoMissionsOptions.length === 0) setIsEmptyEchoMissionsDialogOpen(true)
            else setIsScheduleMissionDialogOpen(true)
            setIsScheduleMissionsPressed(false)
        }
    }, [isScheduleMissionsPressed, props.echoMissionsOptions.length, props.isFetchingEchoMissions])

    let timer: ReturnType<typeof setTimeout>
    const openPopover = () => {
        if (props.frontPageScheduleButtonDisabled) setIsPopoverOpen(true)
    }

    const closePopover = () => setIsPopoverOpen(false)

    const handleHover = () => {
        timer = setTimeout(() => {
            openPopover()
        }, 300)
    }

    const handleClose = () => {
        clearTimeout(timer)
        closePopover()
    }

    const onClickScheduleMission = () => {
        setIsScheduleMissionsPressed(true)
        props.fetchEchoMissions()
    }

    return (
        <>
            <div
                onPointerDown={handleHover}
                onPointerEnter={handleHover}
                onPointerLeave={handleClose}
                onFocus={openPopover}
                onBlur={handleClose}
            >
                <Button
                    onClick={() => {
                        onClickScheduleMission()
                    }}
                    disabled={props.frontPageScheduleButtonDisabled}
                    ref={anchorRef}
                >
                    <>
                        <Icon name={Icons.Add} size={16} />
                        {TranslateText('Add mission')}
                    </>
                </Button>
            </div>

            <Popover
                anchorEl={anchorRef.current}
                onClose={handleClose}
                open={isPopoverOpen && installationCode === ''}
                placement="top"
            >
                <Popover.Content>
                    <Typography variant="body_short">{TranslateText('Please select installation')}</Typography>
                </Popover.Content>
            </Popover>

            <StyledMissionDialog>
                <StyledDialog open={props.isFetchingEchoMissions && isScheduleMissionsPressed} isDismissable>
                    <StyledAutoComplete>
                        <StyledLoading>
                            <CircularProgress />
                            <Typography>{TranslateText('Fetching missions from Echo') + '...'}</Typography>
                        </StyledLoading>
                        <StyledMissionSection>
                            <Button
                                onClick={() => {
                                    setIsScheduleMissionsPressed(false)
                                }}
                                variant="outlined"
                                color="primary"
                            >
                                {' '}
                                {TranslateText('Cancel')}{' '}
                            </Button>
                        </StyledMissionSection>
                    </StyledAutoComplete>
                </StyledDialog>
            </StyledMissionDialog>

            <StyledMissionDialog>
                <Dialog open={isEmptyEchoMissionsDialogOpen} isDismissable>
                    <StyledAutoComplete>
                        <Typography variant="h5">
                            {TranslateText('This installation has no missions - Please create mission')}
                        </Typography>
                        <StyledMissionSection>
                            {CreateMissionButton()}
                            <Button
                                onClick={() => {
                                    setIsEmptyEchoMissionsDialogOpen(false)
                                }}
                                variant="outlined"
                                color="primary"
                            >
                                {' '}
                                {TranslateText('Cancel')}{' '}
                            </Button>
                        </StyledMissionSection>
                    </StyledAutoComplete>
                </Dialog>
            </StyledMissionDialog>

            <StyledMissionDialog>
                <StyledDialog open={isScheduleMissionDialogOpen} isDismissable>
                    <StyledAutoComplete>
                        <Typography variant="h3">{TranslateText('Add mission')}</Typography>
                        <Autocomplete
                            options={props.echoMissionsOptions}
                            onOptionsChange={(changes) => props.onChangeMissionSelections(changes.selectedItems)}
                            label={TranslateText('Select missions')}
                            multiple
                            placeholder={`${props.selectedMissions.length}/${
                                Array.from(props.echoMissionsOptions.keys()).length
                            } ${TranslateText('selected')}`}
                            autoWidth={true}
                            onFocus={(e) => e.preventDefault()}
                        />
                        <Autocomplete
                            optionLabel={(r) => r.name + ' (' + r.model.type + ')'}
                            options={props.robotOptions.filter(
                                (r) =>
                                    r.currentInstallation.toLocaleLowerCase() === installationCode.toLocaleLowerCase()
                            )}
                            label={TranslateText('Select robot')}
                            onOptionsChange={(changes) => props.onSelectedRobot(changes.selectedItems[0])}
                            autoWidth={true}
                            onFocus={(e) => e.preventDefault()}
                        />
                        <StyledMissionSection>
                            <Button
                                onClick={() => {
                                    setIsScheduleMissionDialogOpen(false)
                                }}
                                variant="outlined"
                                color="primary"
                            >
                                {' '}
                                {TranslateText('Cancel')}{' '}
                            </Button>
                            <Button
                                onClick={() => {
                                    props.onScheduleButtonPress()
                                    setIsScheduleMissionDialogOpen(false)
                                }}
                                disabled={props.scheduleButtonDisabled}
                            >
                                {' '}
                                {TranslateText('Add mission')}
                            </Button>
                        </StyledMissionSection>
                    </StyledAutoComplete>
                </StyledDialog>
            </StyledMissionDialog>
        </>
    )
}
