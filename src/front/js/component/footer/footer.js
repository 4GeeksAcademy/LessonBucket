import React, { Component } from "react";

export const Footer = () => (
	<footer className=" bot-footer container-fluid d-flex   text-center w-100 p-0  mt-5 mx-4">
		<div className="row w-100">
			<div className="col-3 justify-content-center">
				<h6 className="text-white ">Project</h6>
				<div className="underline mx-auto mb-3"></div>
				<p className="footer-p">About us</p>
				<p className="footer-p">Our project</p>
				<p className="footer-p">Features</p>
			</div>
			<div className="col-3">
				<h6 className="text-white">Get Help</h6>
				<div className="underline mx-auto mb-3"></div>
				<p className="footer-p">FAQ</p>
				<p className="footer-p">Payment Status</p>
				<p className="footer-p">Ask a Question</p>
			</div>
			<div className="col-3">
				<h6 className="text-white ">Pricing</h6>
				<div className="underline mx-auto mb-3"></div>
				<p className="footer-p">Plans</p>
				<p className="footer-p">Discount Codes</p>
				<p className="footer-p">Payment Options</p>
			</div>
			<div className="col-3">
				<h6 className="text-white ">Follow Us</h6>
				<div className="underline mx-auto mb-3"></div>
				<div className="d-flex justify-content-center ">
				<i className="fa-brands fa-github mx-2"></i>
				<i className="fa-brands fa-linkedin mx-2"></i>
				<i className="fa-brands fa-instagram mx-2"></i>
				</div>
			</div>



		</div>
	</footer>
);
