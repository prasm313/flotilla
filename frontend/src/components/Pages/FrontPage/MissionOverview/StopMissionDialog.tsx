import { Button, Dialog, Typography, Icon } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { useLanguageContext } from 'components/Contexts/LanguageContext'
import { Icons } from 'utils/icons'
import { useState, useEffect } from 'react'
import { tokens } from '@equinor/eds-tokens'
import { Mission } from 'models/Mission'
import { useMissionControlContext } from 'components/Contexts/MissionControlContext'

const StyledDisplayButtons = styled.div`
    display: flex;
    width: 410px;
    flex-direction: columns;
    justify-content: flex-end;
    gap: 0.5rem;
`

const StyledDialog = styled(Dialog)`
    display: grid;
    width: 450px;
`

const StyledText = styled.div`
    display: grid;
    gird-template-rows: auto, auto;
    gap: 1rem;
`

interface MissionProps {
    mission: Mission
}

export enum MissionStatusRequest {
    Pause,
    Stop,
    Resume,
}

export const StopMissionDialog = ({ mission }: MissionProps): JSX.Element => {
    const { TranslateText } = useLanguageContext()
    const { updateMissionState } = useMissionControlContext()
    const [isStopMissionDialogOpen, setIsStopMissionDialogOpen] = useState<boolean>(false)
    const [missionId, setMissionId] = useState<string>()

    const openDialog = () => {
        setIsStopMissionDialogOpen(true)
        setMissionId(mission.id)
    }

    useEffect(() => {
        if (missionId !== mission.id) setIsStopMissionDialogOpen(false)
    }, [mission.id])

    return (
        <>
            <Button variant="ghost_icon" onClick={openDialog}>
                <Icon
                    name={Icons.StopButton}
                    style={{ color: tokens.colors.interactive.secondary__resting.rgba }}
                    size={40}
                />
            </Button>

            <StyledDialog open={isStopMissionDialogOpen} isDismissable>
                <Dialog.Header>
                    <Dialog.Title>
                        <Typography variant="h5">
                            {TranslateText('Stop mission')} <strong>'{mission.name}'</strong>?{' '}
                        </Typography>
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.CustomContent>
                    <StyledText>
                        <Typography variant="body_long">{TranslateText('Stop button pressed warning text')}</Typography>
                        <Typography variant="body_long">
                            {TranslateText('Stop button pressed confirmation text')}
                        </Typography>
                    </StyledText>
                </Dialog.CustomContent>
                <Dialog.Actions>
                    <StyledDisplayButtons>
                        <Button
                            variant="outlined"
                            color="danger"
                            onClick={() => {
                                setIsStopMissionDialogOpen(false)
                            }}
                        >
                            {TranslateText('Cancel')}
                        </Button>
                        <Button
                            variant="contained"
                            color="danger"
                            onClick={() => updateMissionState(MissionStatusRequest.Stop, mission)}
                        >
                            {TranslateText('Stop mission')}
                        </Button>
                    </StyledDisplayButtons>
                </Dialog.Actions>
            </StyledDialog>
        </>
    )
}
