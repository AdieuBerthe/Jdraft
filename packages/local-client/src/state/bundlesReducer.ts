import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import bundler from '../bundler';
import { BundleStartAction, BundleCompleteAction } from './action-types';



interface BundlesState {
	[key: string]:
		| {
				loading: boolean;
				code: string;
				err: string;
		  }
		| undefined;
}

interface CreateBundleArgs {
	cellId: string;
	input: string
}

const initialState: BundlesState = {};

const bundleSlice = createSlice({
	name: 'bundle',
	initialState,
	reducers: {
		bundleStart: (state, action: PayloadAction<BundleStartAction>) => {			
			state[action.payload.cellId] = {
				loading: true,
				code: '',
				err: '',
			};
		},
		bundleComplete: (state, action: PayloadAction<BundleCompleteAction>) => {
			state[action.payload.cellId] = {
				loading: false,
				code: action.payload.bundle.code,
				err: action.payload.bundle.err,
			};
		},

	},
});

 export const createBundle: any = createAsyncThunk(
	'bundles/createBundle',
	async ({cellId, input}: CreateBundleArgs, {dispatch}) => {

		
			dispatch(bundleStart({
				cellId,
			}))
		;

		const result = await bundler(input);
	
			dispatch(bundleComplete({
				cellId,
				bundle: result,
			}))
		;
	  }
 )

export const { bundleStart, bundleComplete, } = bundleSlice.actions;

export const bundlesActions = bundleSlice.actions;

export default bundleSlice.reducer;