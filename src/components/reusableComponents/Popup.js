import React from "react";
import imgOffice from "../../assets/gambar1.jpg";
import logoKM from "../../assets/logo.jpeg";
import dollar from "../../assets/dollar.png";
import successPopUp from "../../assets/popupSuccess.png";

const Popup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className=" bg-white px-1 md:px-4 rounded-lg shadow-lg z-10 shadow-lg w-[80%] h-[70%] md:w-[60%] md:h-[70%] overflow-y-auto">
        <div className="justify-center -mt-16 z-50 absolute  flex inset-x-0 top-50">
          <img
            src={logoKM}
            alt=""
            className="w-[100px] rounded-full shadow-md"
          />
        </div>
        <div className=" flex justify-center mt-12">
          <img src={imgOffice} alt="" className="w-[90%] h-auto" />
        </div>

        <p className=" mt-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates
          iusto fugiat eaque quos eos quod eligendi? Repudiandae accusamus quod
          ducimus autem nesciunt. Id, cum, doloribus nesciunt, totam quis
          incidunt esse qui error aut et in? Distinctio ut ipsa debitis unde
          culpa quia illo non saepe, explicabo consequuntur. Delectus
          repudiandae voluptatem nihil minima qui, reprehenderit provident error
          earum eligendi quis, sunt consequuntur hic explicabo excepturi
          temporibus laboriosam aliquid facilis amet. Obcaecati numquam
          pariatur, nulla, suscipit architecto, quibusdam accusantium esse
          recusandae earum ex quis possimus reiciendis. Vel beatae sint
          voluptatum eum ex a dicta quia atque, laborum ea voluptas itaque vitae
          pariatur fugiat adipisci consectetur unde voluptate sapiente aliquam
          ratione est. Id, vel nam? Placeat quas at quaerat deleniti animi ullam
          obcaecati et sunt totam est magnam corrupti inventore ratione dolorem
          vitae soluta recusandae dolore culpa, iure sit qui fugiat? Optio
          suscipit explicabo numquam autem dignissimos minus libero sint nostrum
          ab quae beatae debitis, nobis tempora hic atque quibusdam harum
          sapiente mollitia aperiam at quam soluta esse? Maxime reprehenderit
          voluptate debitis harum nisi? Deserunt hic totam, molestias iusto
          mollitia vero itaque cumque. Eos similique quae ipsam libero tempore
          sequi minus nulla minima sapiente suscipit vero aspernatur delectus,
          alias, dicta quia harum laudantium? Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Voluptates iusto fugiat eaque quos eos
          quod eligendi? Repudiandae accusamus quod ducimus autem nesciunt. Id,
          cum, doloribus nesciunt, totam quis incidunt esse qui error aut et in?
          Distinctio ut ipsa debitis unde culpa quia illo non saepe, explicabo
          consequuntur. Delectus repudiandae voluptatem nihil minima qui,
          reprehenderit provident error earum eligendi quis, sunt consequuntur
          hic explicabo excepturi temporibus laboriosam aliquid facilis amet.
          Obcaecati numquam pariatur, nulla, suscipit architecto, quibusdam
          accusantium esse recusandae earum ex quis possimus reiciendis. Vel
          beatae sint voluptatum eum ex a dicta quia atque, laborum ea voluptas
          itaque vitae pariatur fugiat adipisci consectetur unde voluptate
          sapiente aliquam ratione est. Id, vel nam? Placeat quas at quaerat
          deleniti animi ullam obcaecati et sunt totam est magnam corrupti
          inventore ratione dolorem vitae soluta recusandae dolore culpa, iure
          sit qui fugiat? Optio suscipit explicabo numquam autem dignissimos
          minus libero sint nostrum ab quae beatae debitis, nobis tempora hic
          atque quibusdam harum sapiente mollitia aperiam at quam soluta esse?
          Maxime reprehenderit voluptate debitis harum nisi? Deserunt hic totam,
          molestias iusto mollitia vero itaque cumque. Eos similique quae ipsam
          libero tempore sequi minus nulla minima sapiente suscipit vero
          aspernatur delectus, alias, dicta quia harum laudantium?
        </p>
        <div className=" sticky z-30 bottom-0 flex inset-x-0 justify-center bg-white py-2">
          <button
            className="mt-4 bg-blue-500 text-white bg-darkblue opacity-90 hover:opacity-100  hover:shadow-md py-2 px-4 rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
