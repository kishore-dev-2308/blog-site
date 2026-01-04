import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function AppPagination({ page, total, limit, onChange }) {
    const totalPages = Math.ceil(total / limit);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            mt={3}
        >
            <IconButton
                disabled={page === 1}
                onClick={() => onChange(page - 1)}
            >
                <ArrowBack />
            </IconButton>

            <Typography>
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </Typography>

            <IconButton
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
            >
                <ArrowForward />
            </IconButton>
        </Box>
    );
}
