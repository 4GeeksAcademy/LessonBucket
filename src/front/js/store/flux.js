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


					console.log(data);
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

					console.log(getStore().user)

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
					const response = await axios.post(`${process.env.BACKEND_URL}/api/user/${getStore().user.id}/class`, newSubjectClass);

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
			}
		}
	};
};

export default getState;