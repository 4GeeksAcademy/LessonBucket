import axios from "axios"


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,

			// ALMACEN DE USUARIOS
			user: {},
			// ALMACEN DE Token
			token: "",
			//ALMACEN DE PASSWORD
			recoverPass: "",
			// ESTADO DE DE LOGADO PARA GESTIÓN TOKEN
			logged: false,
			// ALMACEN DE ESTUDIANTES
			allStudents: [],


			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			allSubjects: [],
			studentsPendingPayment: []
		},
		actions: {

			

			// FUNCION PARA CREAR USUARIO

			signup: async (dataName, dataEmail, dataPassword, dataBirthDate, dataAddress) => {

				try {

					const response = await axios.post(process.env.BACKEND_URL + "/api/signup", {
						name: dataName,
						email: dataEmail,
						password: dataPassword,
						birth_date: dataBirthDate,
						address: dataAddress
					});

					const data = response.data;

					setStore({
						user: {
							"name": dataName,
							"email": dataEmail,
							"password": dataPassword,
							"birth_date": dataBirthDate,
							"address": dataAddress,
							"id": data.user.id
						},
					});

					console.log(response.data)
					return true;

				} catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},


			// FUNCION PARA LOGIN

			login: async (dataEmail, dataPassword) => {
				try {

					const response = await axios.post(process.env.BACKEND_URL + "/api/login", {
						email: dataEmail,
						password: dataPassword
					});

					const data = response.data;
					
					setStore({

						user: data.user,
						token: data.token,
						logged: true

					});
					sessionStorage.setItem("token", data.token);

					return true;

				} catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},

			// FUNCIÓN PARA VALIDAR TOKEN CUANDO SE CARGA LA PÁGINA Y VERIFICAR SI ESTA LOGADO O NO

			verifyAuthToken: async () => {
				const token = sessionStorage.getItem("token");

				try {
					let response = await axios.get(process.env.BACKEND_URL + "/api/protected", {
						headers: {
							"Authorization": `Bearer ${token}`,
						}
					});

					const userData = response.data.response.user;

					setStore({
						user: userData,
						token: token,
						logged: true
					});

				
					return true;
				} catch (error) {
					sessionStorage.removeItem("token");
					setStore({ logged: false });
					return false;
				}
			},


			// FUNCIÓN PARA OBTENER VERIFICAR SI EMAIL ESTA REGISTRADO PARA RECUPERAR CONTRASEÑA

			recoverPass: async (dataEmail) => {

				try {

					const response = await axios.post(process.env.BACKEND_URL + "/api/forgotpassword", {
						email: dataEmail,
					});

					const data = response.data.new_password;
					console.log(data)


					setStore({
						recoverPass: data
					});

					return true;

				} catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},

			// FUNCIÓN PARA VALIDAR TOKEN CUANDO SE CARGA LA PÁGINA Y VERIFICAR SI ESTA LOGADO O NO

			getAllStudents: async () => {
				const user_id = getStore().user.id;
    			const token = getStore().token			

				try {
					let response = await axios.get(process.env.BACKEND_URL + `/api/user/${user_id}/students`, {
						headers: {
							"Authorization": `Bearer ${token}`,
						}
					});

					const students = response.data.results
						
					setStore({
						allStudents: students 
					});

					return true;

				} catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},


			// FUNCIÓN PARA CREAR UN NUEVO ESTUDIANTE


			createOneStudent: async (dataName, dataEmail, dataAddress, dataPhone, dataGoal) => {

				const user_id = getStore().user.id;
    			const token = getStore().token		
				
				const requestData = {
					name: dataName,
					email: dataEmail,
					address: dataAddress,
					phone: dataPhone,
					goal: dataGoal,
				  };

				try {
					
					let response = await axios.post(process.env.BACKEND_URL + `/api/user/${user_id}/students`, requestData, {
						headers: {
							"Authorization": `Bearer ${token}`,
						},
					});
					

					const newStudent = response.data.results
					
					setStore({
						allStudents: newStudent
					  });

					console.log(response.data)
					return true;

				} catch (error) {
					console.error("An error occurred during user creation", error);
					return error;
				}
			},

			// FUNCIÓN PARA ELIMINAR UN ESTUDIANTE


			deleteOneStudent: async (student_id) => {

				const user_id = getStore().user.id;
    			const token = getStore().token		
				
				
				try {
					
					let response = await axios.delete(process.env.BACKEND_URL + `/api/user/${user_id}/students/${student_id}`, {
						headers: {
							"Authorization": `Bearer ${token}`,
						},
					});

					const newAllStudent = response.data.results
					
					setStore({
						allStudents: newAllStudent
					  });

					console.log(response.data)
					return true;

				} catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},


			// FUNCIÓN PARA MODIFICAR ESTUDIANTE

			modifyOneStudent: async (editedName, editedPhone, editedEmail, editedAddress, editedGoal) => {

				//const user_id = getStore().user.id;
    			//const token = getStore().token	
				//const student_id = getStore().allStudents.id
				// const student_id = getStore().allstudent.id;	
				//console.log(getStore().allStudents)
				//console.log(student_id)

				// const students = getStore().allStudents;
				// students.forEach(student => {
				// 	const studentId = student.id;
				// 	console.log(studentId);
				// });
				
				
				// try {
					
				// 	let response = await axios.patch(process.env.BACKEND_URL + `/api/user/${user_id}/students/${student_id}`, {
				// 		headers: {
				// 			"Authorization": `Bearer ${token}`,
				// 		},
				// 	});


				// 	const modifyStudent = response.data.results
					
					
				// 	setStore({
				// 		allStudents: newAllStudent
				// 	  });

				// 	console.log(response.data)
				// 	return true;

				// } catch (error) {
				// 	console.error("An error occurred during user creation", error);
				// 	return false;
				// }
			},
			
			logout: () => {


				console.log("Deslogando");
				sessionStorage.removeItem("token");
				setStore({
					logged: false,
					token: ""
				});


			},














			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			fetchSubjects: async () => {
				let userId = getStore().user.id;
				if (userId === undefined) {
					userId = 1;
				}
				try {
					const response = await axios.get(`${process.env.BACKEND_URL}/api/user/${userId}/subjects`);
					setStore({
						subjects: response.data
					});
					return true;
				} catch (error) {
					console.error("An error occurred while fetching subjects", error);
					return false;
				}
			},
			fetchStudentsPendingPayment: async () => {
				let userId = getStore().user.id;
				if (userId === undefined) {
					userId = 1;
				}
				try {
					const response = await axios.get(`${process.env.BACKEND_URL}/api/user/${userId}/students`);
					
					setStore({
						studentsPendingPayment: response.data
					});
					return true;
				} catch (error) {
					console.error("An error occurred while fetching subjects", error);
					return false;
				}
			},
			//FUNCION PARA VER TODAS LAS MATERIAS
			getAllSubjects: async () => {
				const user_id = getStore().user.id;
				const token = getStore().token
				const allSubjects = getStore().allSubjects

				console.log(user_id)
				console.log(token)
				console.log(allSubjects)

				try {
					let response = await axios.get(process.env.BACKEND_URL + `/api/user/${user_id}/subjects`, {
						headers: {
							"Authorization": `Bearer ${token}`,
						}
					});
					const subjects = response.data.results
					console.log(subjects);
					setStore({
						allSubjects: subjects
					});
					return true;
				} catch (error) {
					console.error("An error occurred during subject retrieval", error);
					return false;
				}
			},
			//FUNCION PARA CREAR MATERIA	
			createSubject: async (SubjectName, UserID) => {

				const user_id = getStore().user.id;
				const token = getStore().token


				try {

					const response = await axios.post(process.env.BACKEND_URL + `/api/user/${user_id}/subjects`, {
						headers: {
							"Authorization": `Bearer ${token}`,
						},
						Subject: SubjectName,
						UserID: UserID,
					});

					const data = response.data;

					setStore({
						AllSubjects: {
							"Subject": data.SubjectName,
							"UserID": data.UserID,
						},
					});


					return true;

				} catch (error) {
					console.error("An error occurred during subject creation", error);
					return false;
				}
			},

		}
	};
};

export default getState;