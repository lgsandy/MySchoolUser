import router from '../router/index';

import {
	baseURL
} from '../constant/constant';

import axious from 'axios';

const state = {
	token: localStorage.getItem('token') || '',
	user: {},
	status: '',
	userDetails:localStorage.getItem('details') || ''
};
const getters = {
	isLogedIn: (state) => !!state.token,
	authState: (state) => state.status,
	user: (state) => state.user,
	userDetails:(state)=>state.userDetails
};
const actions = {
	//Login action
	async login({

		commit
	}, user) {
		commit('auth_request');

		let res =  await axious.post(baseURL + 'user/login', user);
		console.log('-------In auth .js------');
		 console.log(res.data);
		if (res.data.success) {
			
			const token = res.data.token;
			const user = res.data.user;
			// console.log('----------------');
			
			//Set the token in to local storage
			 localStorage.setItem('token', token);
			 localStorage.setItem('details', user.user_name);
			// console.log(res.data.user);
			//set the axious defaults
			 axious.defaults.headers.common['Authorization'] = token;
			// console.log(user);
			commit('auth_success',  user,token);

			//router.push('/main');
		}
		return res;
	},
	//Register User
	async register({
		commit
	}, newUser) {
		commit('register_request');
		let result = await axious.post(baseURL + 'user/register', newUser);
		if (result.data == "User Created Successfully") {
			commit('register_success');
		}
		return result;
	},
	//logout user
	async logout({
		commit
	}) {
		await localStorage.removeItem('token');
		await localStorage.removeItem('details');
		commit('logout');
		delete axious.defaults.headers.common['Authorization'];
		router.push('/');
		return;
	}
};
const mutations = {
	auth_request(state) {
		state.status = 'loading';
	},
	auth_success(state, user,token) {
		state.token = token;
		state.user = user;
		state.status = 'success';
	},
	register_request(state) {
		state.status = 'loading';
	},
	register_success(state) {
		state.status = 'success';
	},
	logout(state) {
		console.log('Logout State');
		console.log(state);
		state.status = '';
		state.user = '';
		state.token = '';
		
	}
};
export default {
	state,
	getters,
	actions,
	mutations
};