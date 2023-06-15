import { Typography } from '@equinor/eds-core-react'
import { BackendAPICaller } from 'api/ApiCaller'
import { Robot } from 'models/Robot'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { RefreshProps } from '../FrontPage'
import { RobotStatusCard, RobotStatusCardPlaceholder } from './RobotStatusCard'
import { useAssetContext } from 'components/Contexts/AssetContext'
import { TranslateText } from 'components/Contexts/LanguageContext'

const RobotCardSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
`
const RobotView = styled.div`
    display: grid;
    grid-column: 1/ -1;
    gap: 1rem;
`
export function RobotStatusSection({ refreshInterval }: RefreshProps) {
    const [robots, setRobots] = useState<Robot[]>([])

    const sortRobotsByStatus = useCallback((robots: Robot[]): Robot[] => {
        const sortedRobots = robots.sort((robot, robotToCompareWith) =>
            robot.status! > robotToCompareWith.status! ? 1 : -1
        )

        return sortedRobots
    }, [])

    const updateRobots = useCallback(() => {
        BackendAPICaller.getEnabledRobots().then((result: Robot[]) => {
            setRobots(sortRobotsByStatus(result))
        })
    }, [sortRobotsByStatus])

    useEffect(() => {
        updateRobots()
    }, [updateRobots])

    useEffect(() => {
        const id = setInterval(() => {
            updateRobots()
        }, refreshInterval)
        return () => clearInterval(id)
    }, [refreshInterval, updateRobots])

    const { assetCode } = useAssetContext()

    var filteredRobots = robots.filter(function (robot) {
        return (
            robot.currentAsset === assetCode ||
            (typeof robot.currentAsset === 'string' && robot.currentAsset.includes('default')) ||
            robot.currentAsset === undefined
        )
    })

    var robotDisplay
    if (assetCode === '') {
        robotDisplay = robots.map(function (robot) {
            return <RobotStatusCard key={robot.id} robot={robot} />
        })
    } else {
        robotDisplay = filteredRobots.map(function (robot) {
            return <RobotStatusCard key={robot.id} robot={robot} />
        })
    }

    return (
        <RobotView>
            <Typography color="resting" variant="h1">
                {TranslateText('Robot status')}
            </Typography>
            <RobotCardSection>
                {robots.length > 0 && robotDisplay}
                {robots.length === 0 && <RobotStatusCardPlaceholder />}
            </RobotCardSection>
        </RobotView>
    )
}
