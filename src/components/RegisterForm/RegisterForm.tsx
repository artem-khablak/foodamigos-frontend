import { FC, useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { UserData } from './../../types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const RegisterForm: FC = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const { handleSubmit, control, watch } = useForm<UserData>();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('access_token');
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate])

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    try {
      const response = await axios.post('http://localhost:80/api/users', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response) {
        const { access_token } = response.data;
        localStorage.setItem('access_token', access_token);
        navigate('/');
      }
    } catch (error) {
      setIsError(true);
      console.error('Request error:', error);
    }
  };

  const password = watch("password", "");
  const confirmPassword = watch("password_confirmation", "");

  return (
    <Container maxWidth="xs">
      <Typography
        sx={{
          p: '2',
        }}
        variant="h3"
        component="h1"
      >
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ 
                required: 'Name is required',
                pattern: /^[A-Za-z]+$/i,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  error={!/^[a-zA-Z]+$/.test(field.value) && field.value.length !== 0}
                  helperText={!/^[a-zA-Z]+$/.test(field.value) && field.value.length ? 'Please enter correct value ' : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  error={field.value.length < 8 && field.value.length !== 0}
                  helperText={field.value.length ? 'Password must be at least 8 characters' : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password_confirmation"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  error={confirmPassword !== "" && confirmPassword !== password}
                  helperText={confirmPassword !== "" && confirmPassword !== password ? "Passwords are not the same" : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="phone_number"
              control={control}
              defaultValue="+1"
              rules={{
                required: 'Phone number is required',
                validate: (value) => value.length === 12
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone number"
                  variant="outlined"
                  fullWidth
                  required
                  error={isNaN(Number(field.value)) || field.value.length > 12}
                  helperText={(isNaN(Number(field.value)) || field.value.length > 12) ? 'Please enter correct value' : ''}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="shipping_address"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Adress"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
            {isError && (
              <Typography
                sx={{
                  color: 'red',
                  m: 1                  
                }}
                variant='h6'
              >
                Something went wrong
              </Typography>
            )}   
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
