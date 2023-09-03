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
			classes: [],
			allSubjects: [],
			studentsPendingPayment: [],
			studentsPerSubject: [],
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
					sessionStorage.setItem("userID", data.user.id);

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

			modifyOneStudent: async (editedName, editedEmail, editedPhone, editedAddress, editedGoal, student_id) => {

				const user_id = getStore().user.id;
				const token = getStore().token

				const requestData = {
					name: editedName,
					email: editedEmail,
					phone: editedPhone,
					address: editedAddress,
					goal: editedGoal,
				};

				try {

					let response = await axios.patch(process.env.BACKEND_URL + `/api/user/${user_id}/students/${student_id}`, requestData, {
						headers: {
							"Authorization": `Bearer ${token}`,
						},
					});


					const modifyStudent = response.data.results


					setStore({
						allStudents: modifyStudent
					});

					console.log(response.data)
					return true;

				} catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},





			logout: () => {


				console.log("Deslogando");
				sessionStorage.removeItem("token");
				setStore({
					logged: false,
					token: ""
				});


			},



			editProfileName: async (newName) => {
				const user_id = getStore().user.id;

				try {
					const response = await axios.patch(process.env.BACKEND_URL + `/api/user/${user_id}`, {
						name: newName,
					});
					setStore({
						user: {
							name: newName,
							email: getStore().user.email,
							address: getStore().user.address,
							birth_date: getStore().user.birth_date,
							id: user_id,
						},
					});
					return true;
				}
				catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},

			editProfileEmail: async (newEmail) => {
				const user_id = getStore().user.id;

				try {
					const response = await axios.patch(process.env.BACKEND_URL + `/api/user/${user_id}`, {
						email: newEmail,
					});
					setStore({
						user: {
							name: getStore().user.name,
							email: newEmail,
							address: getStore().user.address,
							birth_date: getStore().user.birth_date,
							id: user_id,
						},
					});
					return true;
				}
				catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},

			editProfileAddress: async (newAddress) => {
				const user_id = getStore().user.id;

				try {
					const response = await axios.patch(process.env.BACKEND_URL + `/api/user/${user_id}`, {
						address: newAddress,
					});
					setStore({
						user: {
							name: getStore().user.name,
							email: getStore().user.email,
							address: newAddress,
							birth_date: getStore().user.birth_date,
							id: user_id,
						},
					});
					return true;
				}
				catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},

			editProfileBirth: async (newBirth) => {
				const user_id = getStore().user.id;

				try {
					const response = await axios.patch(process.env.BACKEND_URL + `/api/user/${user_id}`, {
						birth_date: newBirth,
					});
					setStore({
						user: {
							name: getStore().user.name,
							email: getStore().user.email,
							address: getStore().user.address,
							birth_date: newBirth,
							id: user_id,
						},
					});
					return true;
				}
				catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},














			editPassword: async (newPassword) => {
				const user_id = getStore().user.id;
				try {
					const response = await axios.patch(process.env.BACKEND_URL + `/api/user/${user_id}`, {
						password: newPassword,
					});
					const data = response.data;
					console.log(response.data)
					console.log(data)
					return true;
				}
				catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},


			editPassword: async (newPassword) => {
				const user_id = getStore().user.id;
				try {
					const response = await axios.patch(process.env.BACKEND_URL + `/api/user/${user_id}`, {
						password: newPassword,
					});
					const data = response.data;
					console.log(response.data)
					console.log(data)
					return true;
				}
				catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
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
			fetchClasses: async () => {
				let userId = getStore().user.id;
				if (userId === undefined) {
					userId = 1;
				}
				try {
					const response = await axios.get(`${process.env.BACKEND_URL}/api/user/${userId}/class`);
					console.log(response.data);
					setStore({
						classes: response.data
					});
					return true;
				} catch (error) {
					console.error("An error occurred while fetching classes", error);
					return false;
				}
			},

			fetchStudentsPendingPayment: async () => {
				try {


					const response = await axios.get(`${process.env.BACKEND_URL}/api/user/${getStore().user.id}/students`);
					console.log(response.data);
					setStore({
						studentsPendingPayment: response.data
					});
					return true;
				} catch (error) {
					console.error("An error occurred while fetching classes", error);
					return false;
				}
			},
			createSubjectClass: async (newClassInfo, closeModal) => {

				const user_id = getStore().user.id;
				try {
					// Create the new class object using the provided parameters
					const newSubjectClass = {
						subjects_id: newClassInfo.subjects_id,
						student_id: newClassInfo.student_id,
						comments_id: newClassInfo.comments_id,
						date: newClassInfo.date,
						price: parseFloat(newClassInfo.price),
						paid: newClassInfo.paid
					};

					// Make a POST request to create the new class
					const response = await axios.post(`${process.env.BACKEND_URL}/api/user/${user_id}/class`, newSubjectClass);

					if (response.status === 200) {
						// Update the classes in the store with the new data
						const updatedClasses = [...getStore().classes.results, response.data.student];
						setStore({
							classes: { ...getStore().classes, results: updatedClasses }
						});

						closeModal(); // Close the modal

						return true;
					} else {
						console.error("Failed to create class");
						return false;
					}
				} catch (error) {
					console.error("An error occurred while creating a new class", error);
					return false;
				}
			},
			updateSubjectClassInStore: async (classId, updatedInfo) => {
				try {
					const response = await axios.put(`${process.env.BACKEND_URL}/api/user/${getStore().user.id}/class/${classId}`, updatedInfo);

					if (response.status === 200) {
						// Update the class in the store with the updated data
						const updatedClasses = getStore().classes.results.map((subjectClass) => {
							if (subjectClass.id === classId) {
								return { ...subjectClass, ...updatedInfo };
							}
							return subjectClass;
						});
						setStore({
							classes: { ...getStore().classes, results: updatedClasses }
						});
						return true;
					} else {
						console.error("Failed to update class");
						return false;
					}
				} catch (error) {
					console.error("An error occurred while updating the class", error);
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
					let response = await axios.get(process.env.BACKEND_URL + `/api/user/${user_id}/subjects/`, {
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
			editProfile: async (newName, newEmail, newAddress, newBirth) => {
				const user_id = getStore().user.id;
				try {
					const response = await axios.patch(process.env.BACKEND_URL + `/api/user/${user_id}`, {
						name: newName,
						email: newEmail,
						address: newAddress,
						birth_date: newBirth,
					});
					const data = response.data;
					console.log(response.data)
					console.log(data)
					return true;
				}
				catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},
			editPassword: async (newPassword) => {
				const user_id = getStore().user.id;
				try {
					const response = await axios.patch(process.env.BACKEND_URL + `/api/user/${user_id}`, {
						password: newPassword,
					});
					const data = response.data;
					console.log(response.data)
					console.log(data)
					return true;
				}
				catch (error) {
					console.error("An error occurred during user creation", error);
					return false;
				}
			},
			//FUNCION PARA CREAR MATERIA	
			createSubject: async (SubjectName, UserID) => {

				const user_id = sessionStorage.getItem("userID");


				try {

					const response = await axios.post(process.env.BACKEND_URL + `/api/user/${user_id}/subjects`, {
						Subject: SubjectName,

					});

					const data = response.data;
					console.log(response);
					if (response.status == 200) {
						getActions().getAllSubjects();
					}

					setStore({
						AllSubjects: {
							"Subject": data.subjects.Subject,
							"UserID": data.userId,
						},
					});


					return true;

				} catch (error) {
					console.error("An error occurred during subject creation", error);
					return false;
				}
			},
			//FUNCION PARA ELIMINAR MATERIA
			deleteSubject: async (subject_id) => {
				const user_id = getStore().user.id;
				const token = getStore().token;


				try {

					let response = await axios.delete(process.env.BACKEND_URL + `/api/user/${user_id}/subjects/${subject_id}`, {
					});
					console.log(response)
					const newAllSubjects = response.data.results
					if (response.status == 200) {
						getActions().getAllSubjects();
					}

					setStore({
						allSubjects: newAllSubjects
					});

					console.log(response.data)
					return true;

				} catch (error) {
					console.error("An error occurred during subject removal", error);
					return false;
				}
			},
			modifyOneSubject: async (subject_id, editedSubject) => {

				const user_id = getStore().user.id;
				const token = getStore().token

				const requestData = {
					Subject: editedSubject
				};

				try {

					let response = await axios.patch(process.env.BACKEND_URL + `/api/user/${user_id}/subjects/${subject_id}`, requestData, {
						headers: {
							"Authorization": `Bearer ${token}`,
						},
					});


					const modifySubject = response.data.results
					if (response.status == 200) {
						getActions().getAllSubjects();
					}


					setStore({
						allSubjects: modifySubject
					});

					console.log(response.data)
					return true;

				} catch (error) {
					console.error("An error occurred during subject modification", error);
					return false;
				}
			},
			// getAllStudentsPerSubject: async (subject_id) => {
			// 	const user_id = getStore().user.id;
			// 	const token = getStore().token

			// 	try {
			// 		let response = await axios.get(process.env.BACKEND_URL + `/api/user/${user_id}/students/${subject_id}`, {
			// 			headers: {
			// 				"Authorization": `Bearer ${token}`,
			// 			}
			// 		});

			// 		const studentsPerSubject = response.data.results



			// 		setStore({
			// 			AllStudents: studentsPerSubject
			// 		});

			// 		return true;

			// 	} catch (error) {
			// 		console.error("An error occurred during student retrieval", error);
			// 		return false;
			// 	}
			// },

		}
	};
};

export default getState;