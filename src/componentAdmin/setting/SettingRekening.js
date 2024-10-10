import React, { useEffect, useState } from "react";
import {
  Coba10,
  Coba11,
  Coba6,
} from "../../components/reusableComponents/Text";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { BtnAdmin1 } from "../../components/reusableComponents/ButtonAdmin";

const initialState = {
  rekening1: "",
  rekening2: "",
  rekening3: "",
  rekening4: "",
  rekening5: "",
};

const SettingRekening = () => {
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");
  const [loading, setLoading] = useState(false);
  const [rekening, setRekening] = useState([]);
  const [edit, setEdit] = useState(false);

  const fetchContact = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://laravel-api-10.cerise.id/api/setting-generals",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRekening([response.data.data]);
      console.log("respon rekening", response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    // Set edit to false when the button is clicked
    setEdit(true);
  };

  const handleCancelEditClick = () => {
    setEdit(false);
  };

  const onSubmit = async (e) => {
    try {
      await axios.post(
        `https://laravel-api-10.cerise.id/api/setting-generals/update-setting-general/1`,
        {
          rekening1: values.rekening1,
          rekening2: values.rekening2,
          rekening3: values.rekening3,
          rekening4: values.rekening4,
          rekening5: values.rekening5,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-HTTP-Method-Override": "PUT",
          },
        }
      );
      fetchContact();
      alert("EDIT DATA BERHASIL");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const {
    handleChange,
    values,
    handleSubmit,
    resetForm,
    errors,
    handleBlur,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: input,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    fetchContact();
  }, []);
  return (
    <div className="w-[95%] relative bg-white pt-4">
      <div className="mt-4 mb-8 text-left pl-4 pt-8">
        <Coba10 text="Setting Rekening" />
      </div>

      {rekening.map((item, index) => (
        <div key={index} className=" grid grid-cols-12 gap-2 pl-8 pb-4">
          <div className="col-span-12 flex relative justify-start">
            {edit ? (
              ""
            ) : (
              <button
                className="border border-dark p-2 rounded-md hover:bg-dark hover:text-white"
                onClick={handleEditClick}
              >
                Edit Rekening
              </button>
            )}
          </div>
          <div className="col-span-1 text-left">
            <Coba6 text="Rekening 1" />
          </div>
          {edit ? (
            <div className="col-span-11 text-left">
              <input
                type="text"
                onChange={handleChange}
                name="rekening1"
                value={values.rekening1}
                onBlur={handleBlur}
                placeholder="Rekening 1 "
                className="w-[40%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
              />
            </div>
          ) : (
            <div className="col-span-11 text-left">
              <Coba6 text={`: ${item.rekening1}`} />
            </div>
          )}

          <div className="col-span-1 text-left">
            <Coba6 text="Rekening 2" />
          </div>
          {edit ? (
            <div className="col-span-11 text-left">
              <input
                type="text"
                onChange={handleChange}
                name="rekening2"
                value={values.rekening2}
                onBlur={handleBlur}
                placeholder="Rekening 2 "
                className="w-[40%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
              />
            </div>
          ) : (
            <div className="col-span-11 text-left">
              <Coba6 text={`: ${item.rekening2}`} />
            </div>
          )}

          <div className="col-span-1 text-left">
            <Coba6 text="Rekening 3" />
          </div>
          {edit ? (
            <div className="col-span-11 text-left">
              <input
                type="text"
                onChange={handleChange}
                name="rekening3"
                value={values.rekening3}
                onBlur={handleBlur}
                placeholder="Rekening 3 "
                className="w-[40%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
              />
            </div>
          ) : (
            <div className="col-span-11 text-left">
              <Coba6 text={`: ${item.rekening3}`} />
            </div>
          )}

          <div className="col-span-1 text-left">
            <Coba6 text="Rekening 4" />
          </div>
          {edit ? (
            <div className="col-span-11 text-left">
              <input
                type="text"
                onChange={handleChange}
                name="rekening4"
                value={values.rekening4}
                onBlur={handleBlur}
                placeholder="Rekening 4"
                className="w-[40%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
              />
            </div>
          ) : (
            <div className="col-span-11 text-left">
              <Coba6 text={`: ${item.rekening4}`} />
            </div>
          )}

          <div className="col-span-1 text-left">
            <Coba6 text="Rekening 5" />
          </div>
          {edit ? (
            <div className="col-span-11 text-left">
              <input
                type="text"
                onChange={handleChange}
                name="rekening5"
                value={values.rekening5}
                onBlur={handleBlur}
                placeholder="Rekening 5 "
                className="w-[40%] h-[45px] border border-[#D3D3D3] rounded-lg pl-4"
              />
            </div>
          ) : (
            <div className="col-span-11 text-left">
              <Coba6 text={`: ${item.rekening5}`} />
            </div>
          )}

          <div className="col-span-12 flex relative justify-start">
            {edit ? (
              <div className="flex relative">
                <div className="">
                  <BtnAdmin1 text="Cancel" onClick={handleCancelEditClick} />
                </div>

                <div className="pl-2">
                  <BtnAdmin1 text="Simpan" onClick={handleSubmit} />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="col-span-12"></div>
        </div>
      ))}
    </div>
  );
};

export default SettingRekening;
