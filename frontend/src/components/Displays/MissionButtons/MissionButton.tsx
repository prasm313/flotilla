import { Button, Typography, Popover, Icon } from '@equinor/eds-core-react'
import { useLanguageContext } from 'components/Contexts/LanguageContext'
import { Icons } from 'utils/icons'
import { useRef, useState } from 'react'
import { useInstallationContext } from 'components/Contexts/InstallationContext'
import styled from 'styled-components'

const StyledButton = styled(Button)`
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
`

export const MissionButton = (): JSX.Element => {
    const { TranslateText } = useLanguageContext()
    const { installationCode } = useInstallationContext()
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
    const anchorRef = useRef<HTMLButtonElement>(null)
    const echoURL = 'https://echo.equinor.com/missionplanner?instCode='

    let timer: ReturnType<typeof setTimeout>
    const openPopover = () => {
        if (installationCode === '') setIsPopoverOpen(true)
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

    return (
        <>
            <div
                onPointerDown={handleHover}
                onPointerEnter={handleHover}
                onPointerLeave={handleClose}
                onFocus={openPopover}
                onBlur={handleClose}
            >
                <StyledButton
                    variant="outlined"
                    onClick={() => {
                        window.open(echoURL + installationCode)
                    }}
                    disabled={installationCode === ''}
                    ref={anchorRef}
                >
                    <Icon name={Icons.ExternalLink} size={16}></Icon>
                    {TranslateText('Create new Echo mission')}
                </StyledButton>
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
        </>
    )
}
