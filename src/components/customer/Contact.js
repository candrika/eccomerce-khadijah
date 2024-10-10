import React from "react";
import wa from "../../assets/whatsapp.png";
import { Link } from "react-router-dom";
import Button from "../reusableComponents/Button";

const Contact = () => {
  return (
    <div className=" relative p-4 ">
      <div className="bg-white pb-4 md:pb-0  rounded-lg shadow-lg relative md:flex w-[90%] left-[5%]">
        {/*<div className=" relative bg-white w-[100%]  ">*/}
        {/*  <div className=" w-[90%] relative left-[5%] text-left">*/}
        {/*    <p className="font-bold text-lg text-[#00B7FE]">Contact</p>*/}
        {/*  </div>*/}
        {/*  <div className=" w-[90%] relative left-[5%] text-left">*/}
        {/*    <div className=" py-3">*/}
        {/*      <input*/}
        {/*        type="text"*/}
        {/*        placeholder="Nama"*/}
        {/*        className="border border-gray-300 w-[250px] md:w-[100%] px-4 h-[35px] rounded-lg"*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    <div className=" py-3">*/}
        {/*      <input*/}
        {/*        type="email"*/}
        {/*        placeholder="Email"*/}
        {/*        className="border border-gray-300 w-[250px] md:w-[100%] px-4 h-[35px] rounded-lg"*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    <div className=" py-3">*/}
        {/*      <textarea*/}
        {/*        name=""*/}
        {/*        id=""*/}
        {/*        cols="30"*/}
        {/*        rows="10"*/}
        {/*        className="border border-gray-300 w-[250px] md:w-[100%] px-4 rounded-lg"*/}
        {/*      ></textarea>*/}
        {/*    </div>*/}

        {/*    <div className=" py-3">*/}
        {/*      <Button text="Save" variant="button-2" />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className=" relative bg-white w-[100%]  ">
          <div className=" w-[90%] relative left-[5%] text-left">
            <p className="font-bold text-lg text-[#00B7FE]">Location</p>
          </div>

          <div className=" w-[90%]  relative left-[5%] text-left ">
            <iframe
              className="w-[273px] md:w-[100%] h-[300px] md:h-[350px] rounded-md "
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.3032389711448!2d110.35953857443262!3d-7.757628676928685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a585be3c124bb%3A0xe123f3fd7a9bba0e!2sKedai%20Satwa!5e0!3m2!1sid!2sid!4v1687270043172!5m2!1sid!2sid"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="   flex justify-end w-[90%] left-[5%] my-8 sticky bottom-0 z-10">
        <Link to="https://api.whatsapp.com/send?phone=087832171593">
          <button className="">
            <img src={wa} alt="" className="w-[40px]" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Contact;
