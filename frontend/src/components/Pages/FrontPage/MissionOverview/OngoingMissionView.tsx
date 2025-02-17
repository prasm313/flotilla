import { Button, Typography, Icon } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { RefreshProps } from '../FrontPage'
import { NoOngoingMissionsPlaceholder } from './NoMissionPlaceholder'
import { OngoingMissionCard } from './OngoingMissionCard'
import { useLanguageContext } from 'components/Contexts/LanguageContext'
import { useNavigate } from 'react-router-dom'
import { config } from 'config'
import { Icons } from 'utils/icons'
/* import { useOngoingMissionsContext } from 'components/Contexts/OngoingMissionsContext' */
import { useMissionsContext } from 'components/Contexts/MissionListsContext'

const StyledOngoingMissionView = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const OngoingMissionSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
`

const ButtonStyle = styled.div`
    display: block;
`

export function OngoingMissionView({ refreshInterval }: RefreshProps) {
    const { TranslateText } = useLanguageContext()
    const { ongoingMissions } = useMissionsContext()

    const ongoingMissionscard = ongoingMissions.map(function (mission, index) {
        return <OngoingMissionCard key={index} mission={mission} />
    })
    let navigate = useNavigate()
    const routeChange = () => {
        const path = `${config.FRONTEND_BASE_ROUTE}/history`
        navigate(path)
    }

    return (
        <StyledOngoingMissionView>
            <Typography variant="h1" color="resting">
                {TranslateText('Ongoing Missions')}
            </Typography>
            <OngoingMissionSection>
                {ongoingMissions.length > 0 && ongoingMissionscard}
                {ongoingMissions.length === 0 && <NoOngoingMissionsPlaceholder />}
            </OngoingMissionSection>
            <ButtonStyle>
                <Button variant="outlined" onClick={routeChange}>
                    <Icon name={Icons.Historic} />
                    {TranslateText('History')}
                </Button>
            </ButtonStyle>
        </StyledOngoingMissionView>
    )
}
