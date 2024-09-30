import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import authService from "./authService";

const initialState = {
    users: [],
    currentUser: null,
    // currentUser: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')) : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    isAuthenticated: !!localStorage.getItem('token')
}
export const signup = createAsyncThunk('users/signup', async (userData, thunkAPI) => {
    try {
        return await authService.signup(userData);
    } catch (error) {
        console.error('API Error:', error.response);
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
});
export const login = createAsyncThunk('users/adminlogin', async (credentials, thunkAPI) => {
    try {
        toast.success('Login successfully!');
        return await authService.login(credentials);
    } catch (error) {
        toast.error('Error occurred while login.');  // Check the error response
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
});
export const forgotPassword = createAsyncThunk('users/forgotPassword', async (email, thunkAPI) => {
    try {
        return await authService.forgotPassword(email);
    } catch (error) {
        console.error('API Error:', error.response);
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
});
export const resetPassword = createAsyncThunk('users/resetPassword', async (data, thunkAPI) => {
    try {
        return await authService.resetPassword(data);
    } catch (error) {
        console.error('API Error:', error.response);
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.currentUser = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            toast.success('Logged out successfully!');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            console.log("Hello world");
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        builder.addCase(login.fulfilled, (state, action) => {
            console.log('Login successful:', action.payload);
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.currentUser = action.payload
            localStorage.setItem('token', JSON.stringify(action.payload));
            state.isAuthenticated = true
        })
        builder.addCase(login.rejected, (state, action) => {
            console.log('Login failed:', action.payload || action.error);
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.errorMessage = action.error?.message || action.payload?.message || "An Error Occurred"
        })
        builder.addCase(signup.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.currentUser = action.payload;
            localStorage.setItem('token', JSON.stringify(action.payload));
            state.isAuthenticated = true;
        });
        builder.addCase(signup.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = action.error?.message || action.payload?.message || "An Error Occurred";
        });

        // Forgot Password
        builder.addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        });
        builder.addCase(forgotPassword.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = action.error?.message || action.payload?.message || "An Error Occurred";
        });

        // Reset Password
        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        });
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = action.error?.message || action.payload?.message || "An Error Occurred";
        });
       
    }
})
export const { logout } = authSlice.actions;
export default authSlice.reducer