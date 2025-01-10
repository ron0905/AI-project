import { Paper, styled, Typography } from '@mui/material';

export const DashboardCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: '100%',
  minHeight: '300px',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
  borderRadius: theme.spacing(1)
}));

export const DashboardCardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary
}));

export const DashboardMetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1)
})); 