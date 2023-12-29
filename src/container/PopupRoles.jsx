import { useState } from 'react';
import InputField from './InputField';
import TextBox from './TextBox';
import Checkbox from './Checkbox';
// import {useNavigate} from 'react-router-dom';
import { userGloabalContext } from '../UserContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AccessManagement from './AccessManagement';
import wyraiApi from '../api/wyraiApi';
import { useNavigate } from 'react-router-dom';
// import { Socket } from 'engine.io-client';
// import initSocket from '../Components/socket';

const PopupRoles = (props) => {



  // const socket = initSocket();
  const { setPopupRole } = props;
          const { fetchRole, userInformation ,companyId} = userGloabalContext();
          console.log("22=======>",userInformation?.email)
  const navigate = useNavigate();

  // const companyId = userInformation.companyId._id;

  const [accessGranted, setAccessGranted] = useState(null);

  const roleSchema = Yup.object().shape({
    role: Yup.string().required('Name is Role required '),
    description: Yup.string().required('Description is required'),
  });
  const initialValues = {
    role: '',
    description: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validationSchema: roleSchema,
  });

  const handleSubmit = async () => {
    const grantedPermissions = Object.keys(accessGranted)
      .map((e) => {
        const permissions = Object.keys(accessGranted[e]);
        return { [e]: permissions };
      })
      .reduce((a, b) => ({ ...a, ...b }), {});

    console.log({
      ...formik.values,
      companyId,
      SelectAccess: grantedPermissions,
    });
    wyraiApi
      .post(`/api/roles`, {
        ...formik.values,
        companyId,
        SelectAccess: grantedPermissions,
      })
      .then((res) => {
        setPopupRole(false);
      
        const data = {
          senderName:userInformation?.email,
          text:"New Role has been generated"
        }
         console.log("userRole Data",data);
        //  socket.emit("RoleText",data)
        
        fetchRole();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className=" fixed inset-0 bg-[#00000080] h-screen w-screen ">
        <form
          onSubmit={formik.handleSubmit}
          className="w-1/2 h-[95vh] m-auto p-4 rounded-3xl bg-white flex flex-col justify-between items-center "
        >
          <h1 className="text-2xl mt-4 mb-6">Create Role</h1>
          <div className="w-full flex flex-col gap-5  ">
            <InputField
              label="Name of the Role"
              name="role"
              type="text"
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && formik.errors.role}
              placeholder={'Name of the Role'}
              labelColor={'bg-white'}
            />

            <div className=" w-[92.5%]">
              <TextBox
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
                name={'description'}
                setChange={formik.handleChange}
                title={'Description'}
                value={formik.values.description}
                // onChange={formik.handleChange}
                error={formik.touched.description && formik.errors.description}
              />
            </div>
          </div>
          <div className="overflow-auto w-full">
            <AccessManagement
              accessGranted={accessGranted}
              setAccessGranted={setAccessGranted}
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-blue text-white py-[10px] px-[45px] rounded-md"
          >
            save
          </button>
        </form>
      </div>
    </>
  );
};

export default PopupRoles;
