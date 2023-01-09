
import Vuex from 'vuex'
import axios from 'axios'



const login = async ({ commit }, credentials) => {
   try {
     const response = await axios.get('http://localhost:3000/users/1', { params: credentials });
     commit('SET_TOKEN', response.data.token);
   } catch (error) {
     console.error(error);
   }
};


const logout = ({ commit }) => {
   commit('SET_TOKEN', '');
   commit('SET_USER', {});
 };
 

 const setToken = (state, token) => {
   state.token = token;
 };

 const setUser = (state, user) => {
   state.user = user;
 };
 

 const getUserData = async ({ commit }) => {
   try {
     const token = getters.getToken;
     const response = await axios.get('http://localhost:3000/users/1', { headers: { authorization: `Bearer ${token}` } });
     commit('SET_USER', response.data);
   } catch (error) {
     console.error(error);
   }
 };
 
 export default new Vuex.Store({
   state: {
     token: '',
     user: {}
   },
   getters: {
     getToken: state => state.token
   },
   mutations: {
     SET_TOKEN: setToken,
     SET_USER: setUser
   },
   actions: {
     login,
     logout,
     getUserData
   }
 });