import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function ChoosenGoals() {
    return (
        <Box sx={{ display: 'flex', gap: 4 }}>
            <Badge badgeContent={30} size="lg">
                <Typography fontSize="xl">🎯</Typography>
            </Badge>
        </Box>
    );
}