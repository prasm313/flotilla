import { Typography } from '@equinor/eds-core-react'
import { Mission } from 'models/Mission'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLanguageContext } from 'components/Contexts/LanguageContext'
import { Task } from 'models/Task'
import { tokens } from '@equinor/eds-tokens'

const StyledTagCount = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
interface MissionProps {
    mission: Mission
}

export const MissionProgressDisplay = ({ mission }: MissionProps) => {
    const { TranslateText } = useLanguageContext()
    const [completedTasks, setCompletedTasks] = useState<number>(0)

    const tasks = mission.tasks

    useEffect(() => {
        setCompletedTasks(countCompletedTasks(tasks))
    }, [tasks])

    const countCompletedTasks = (tasks: Task[]) => {
        return tasks.filter((task) => task.isCompleted).length
    }

    return (
        <StyledTagCount>
            <Typography variant="meta" color={tokens.colors.text.static_icons__tertiary.hex}>
                {TranslateText('Completed Tasks')}
            </Typography>
            <Typography>
                {completedTasks}/{tasks.length}
            </Typography>
        </StyledTagCount>
    )
}
