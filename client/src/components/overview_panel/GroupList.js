import { Box } from "@mui/material";
import GroupRow from "./GroupRow";

export default function GroupList({ groupList }) {
    return (
        <Box
            display='flex'
            flexDirection='column'
            gap='1.5rem'
            paddingRight='1rem'
        >
            {Object.keys(groupList).map(key => {
                return (<GroupRow key={key} groupTitle={key} amount={groupList[key]} />)
            })}
        </Box>
    )
}