import React from 'react';
import Chart from 'react-google-charts';
import { Box } from '@mui/material';

export default function OverviewChart({ groupList }) {
    
    const formatGroups = () => {
        const formatedGroups = [];

        for (let key in groupList) {
            formatedGroups.push([key, groupList[key]]);
        }

        return formatedGroups;
    }

    const data = [
        ['Group', 'Amount'],
        ...formatGroups()
    ];

    const options = {
        pieHole: 0.5,
        chartArea: {width: '100%'},
        legend: {position: 'bottom'},
    };

    return (
        <Box>
            <Chart
                width={'100%'}
                height={'400px'}
                style={{marginTop: '-50px', zIndex: '-1'}}
                chartType="PieChart"
                loader={<Box>Loading Chart</Box>}
                data={data}
                options={options}
            />
        </Box>
    );
};
