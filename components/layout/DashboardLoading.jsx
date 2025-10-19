// components/layout/DashboardLoading.jsx
import { Box, Skeleton, Grid, Paper } from "@mui/material";

export default function DashboardLoading() {
  return (
    <Box sx={{ p: 3 }}>
      
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={200} height={60} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={300} height={30} />
      </Box>

      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Skeleton
                variant="circular"
                width={50}
                height={50}
                sx={{ mb: 2 }}
              />
              <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="60%" height={20} />
            </Paper>
          </Grid>
        ))}
      </Grid>

      
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Skeleton variant="text" width={150} height={40} sx={{ mb: 2 }} />
        {[1, 2, 3, 4, 5].map((row) => (
          <Box key={row} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ mr: 2 }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" width="70%" height={25} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="50%" height={20} />
            </Box>
            <Skeleton
              variant="rectangular"
              width={80}
              height={30}
              sx={{ borderRadius: 1 }}
            />
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
