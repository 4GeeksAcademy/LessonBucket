import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../../styles/profile.scss";




export const Profile = () => {

    const [editName, setEditName] = useState(false);
    const [nameText, setNameText] = useState('');
    const [editEmail, setEditEmail] = useState(false);
    const [emailText, setEmailText] = useState('');
    const [editAddress, setEditAddress] = useState(false);
    const [addressText, setAddressText] = useState('');
    const [editBirth, setEditBirth] = useState(false);
    const [birthText, setBirthText] = useState('');
    const [passInput1, setPassInput1] = useState('');
    const [passInput2, setPassInput2] = useState('');
    const [editPass, setEditPass] = useState(false);
    const { store, actions } = useContext(Context);


      
    const handleNameText = (event) => {
        setNameText(event.target.value)
    }

    const handleEmailText = (event) => {
        setEmailText(event.target.value)
    }
    
    const handleAddressText = (event) => {
        setAddressText(event.target.value)
    }

    const handleBirthText = (event) => {
        setBirthText(event.target.value)
    }
    
    
    const saveDataName = () => { 
        setEditName(false)
        actions.editProfileName(nameText);
        setNameText('')
    }

    const saveDataEmail = () => { 
        setEditEmail(false)
        actions.editProfileEmail(emailText);
        setEmailText('')
    }

    const saveDataAddress = () => { 
        setEditAddress(false)
        actions.editProfileAddress(addressText);
        setAddressText('')
    }

    const saveDataBirth = () => { 
        
        setEditBirth(false)
        actions.editProfileBirth(birthText);
        setBirthText('')
    }

    const saveDataPassword = () => {
        actions.fetchPassword();
        actions.editPassword(passInput1)
        alert('Password changed succesfully')
    }
    


    const handleName = () => {
        
        if (editName === false) {

           
            
            return (

                <div className="profile-data my-1 align-items-center d-flex flex-row justify-content-between p-2 border rounded">
                    <p className="tag me-2 align-items-center">Full Name</p>
                    <p className="data mb-0 align-items-center">{store.user.name}</p>
                    <i className="fa-solid fa-pen-to-square align-items-center" onClick={() => { setEditName(true) }}></i>
                </div>

            );

        

        }

        else {
            return (
                <div className="profile-data my-1 align-items-center d-flex flex-row justify-content-between p-2 border rounded">
                    <p className="tag me-2 align-items-center">Full Name</p>
                    <form onSubmit={saveDataName}>
                        <input  type="text" id="name-input" placeholder={store.user.name} onChange={handleNameText} onBlur={() => { document.getElementById("name-input").value = ""; }} className=" name-input profile-input data mb-0 align-items-center"></input>
                        <i className="fa-solid fa-xmark me-1 text-danger" onClick={() => { setEditName(false); }}></i>
                        <i className="fa-solid fa-floppy-disk" onClick={saveDataName}></i>
                    </form>
                    
                </div>

            )
        }

  

    };

 

    const handleEmail = () => {
        if (editEmail === false) {
            return (

                <div className="profile-data my-1 align-items-center d-flex flex-row justify-content-between p-2 border rounded">
                    <p className="tag me-2 align-items-center">Email</p>
                    <p className="data mb-0 align-items-center">{store.user.email}</p>
                    <i className="fa-solid fa-pen-to-square align-items-center" onClick={() => { setEditEmail(true) }}></i>
                </div>

            );
        }

        else {
            return (
                <div className="profile-data my-1 align-items-center d-flex flex-row justify-content-between p-2 border rounded">
                    <p className="tag me-2 align-items-center">Email</p>
                    <form onSubmit={saveDataEmail}>
                        <input type="email" id="email-input" placeholder={store.user.email} onChange={handleEmailText} onBlur={() => { document.getElementById("email-input").value = ""; }} className=" profile-input data mb-0 align-items-center"></input>
                    </form>
                    <i className="fa-solid fa-xmark me-1 text-danger" onClick={() => { setEditEmail(false); }}></i>
                    <i className="fa-solid fa-floppy-disk" onClick={saveDataEmail}></i>
                </div>

            )
        }
    }


    const handleAddress = () => {
        if (editAddress === false) {
            return (

                <div className="profile-data my-1 align-items-center d-flex flex-row justify-content-between p-2 border rounded">
                    <p className="tag me-2 align-items-center">Address</p>
                    <p className="data mb-0 align-items-center">{store.user.address}</p>
                    <i className="fa-solid fa-pen-to-square align-items-center" onClick={() => { setEditAddress(true) }}></i>
                </div>

            );
        }

        else {
            return (
                <div className="profile-data my-1 align-items-center d-flex flex-row justify-content-between p-2 border rounded">
                    <p className="tag me-2 align-items-center">Address</p>
                    <form onSubmit={saveDataAddress}>
                        <input type="text" id="address-input" placeholder={store.user.address} onChange={handleAddressText} onBlur={() => { document.getElementById("address-input").value = ""; }} className=" profile-input data mb-0 align-items-center"></input>
                    </form>
                    <i className="fa-solid fa-xmark me-1 text-danger" onClick={() => { setEditAddress(false); }}></i>
                    <i className="fa-solid fa-floppy-disk" onClick={saveDataAddress}></i>
                </div>

            )
        }
    }


    const handleBirth = () => {

        

            if (editBirth === false) {
                return (
    
                    <div className="profile-data my-1 align-items-center d-flex flex-row justify-content-between p-2 border rounded">
                        <p className="tag me-2 align-items-center">Birth Date</p>
                        <p className="data mb-0 align-items-center">{store.user.birth_date}</p>
                        <i className="fa-solid fa-pen-to-square align-items-center" onClick={() => { setEditBirth(true) }}></i>
                    </div>
    
                );
            }

        

        if (editBirth === false) {
            return (

                <div className="profile-data my-1 align-items-center d-flex flex-row justify-content-between p-2 border rounded">
                    <p className="tag me-2 align-items-center">Birth Date</p>
                    <p className="data mb-0 align-items-center">{store.user.birth_date}</p>
                    <i className="fa-solid fa-pen-to-square align-items-center" onClick={() => { setEditBirth(true) }}></i>
                </div>

            );
        }

        else {
            return (
                <div className="profile-data my-1 align-items-center d-flex flex-row justify-content-between p-2 border rounded">
                    <p className="tag me-2 align-items-center">Birth Date</p>
                    <form onSubmit={saveDataBirth}>
                        <input type="text" id="birth-input" placeholder={store.user.birth_date}  onChange={handleBirthText} onBlur={() => { document.getElementById("birth-input").value = ""; }} className=" profile-input data mb-0 align-items-center"></input>
                    </form>
                    <i className="fa-solid fa-xmark me-1 text-danger" onClick={() => { setEditBirth(false); }}></i>
                    <i className="fa-solid fa-floppy-disk" onClick={saveDataBirth}></i>
                </div>

            )
        }
    }


    

    const handlePass = () => {

        

        return (
            <>
            <form className="passwordForm">
            <h4>New Password</h4>
            <input type="password" className="form-control pass-input data  align-items-center mb-4" id="inputPassword" placeholder="Password" onChange={handlePassInput1}></input>
            <h4>Repeat Password</h4>
            <input type="password" className="form-control pass-input data  align-items-center mb-4" id="inputPassword" placeholder="Password" onChange={handlePassInput2}></input>
            {comparePassword()}
            <i className="fa-solid fa-backward m-auto p-2 my-2" onClick={() => setEditPass(false)}></i>
            </form>
           
            </>
        );
    }

    
    const handlePassInput1 = (event) => {
        setPassInput1(event.target.value)
    }
    
    const handlePassInput2 = (event) => {
        setPassInput2(event.target.value)
    }

    const comparePassword = () => {
        if ((passInput1 === passInput2) && (passInput1 != "") && (passInput2 != ""))  { 

            
            return (
            
            <>
            <p style={{ color: 'green'}}>✔️ Passwords match </p>
            <div className="btn-primary my-4 rounded py-2" onClick={saveDataPassword}>Change Password</div>
            </> 
            )}

        else { return (
         <>   
        <p style={{ color: 'red'}}>❌ Both passwords must be the same</p>
        <div className="btn btn-primary my-4 disabled">Change Password</div>
        </>
        )}
    }

    
   

    // LOGIN OUTPUT

    
    
    if (store.token != ""){
        
        return (

        <>  
        
             
             {!editPass ?

            <section className=" profile-wrapper  d-flex flex-column p-5 bg-white rounded-full mx-auto ">
            
                <>
                <h2 className="mb-4"> Profile Information</h2>
                
                {handleName()}
                {handleEmail()}
                {handleAddress()}
                {handleBirth()}
                <div className="profile-data my-2 align-items-center d-flex flex-row justify-content-center p-2 rounded-full ">
                    <i className="me-2 fa-solid fa-lock text-warning"></i>
                    <p className="password tag m justify-content-center" onClick={() => {setEditPass(true)}}>Change Password</p>
                </div>
                </>
            </section>

             :

             <section className=" profile-wrapper  d-flex flex-column p-5 bg-white rounded mx-auto justify-content-center ">
                    
                {handlePass()}
               
             </section>
            }
          

               


        </>
    )}

    else { return (<p className="text-white text-center">Please login to see your profile</p>)}

    




}