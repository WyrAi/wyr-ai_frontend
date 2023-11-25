import React, { useEffect, useState } from 'react';
import { AllRoles, SelectAccess } from '../assets/data/CustomRoles';
import checked from '../assets/checked.svg';
import unchecked from '../assets/unchecked.svg';
import down from '../assets/mingcute_up-fill (1).svg';
import up from '../assets/mingcute_up-fill.svg';
import { userGloabalContext } from '../UserContext';

const AccessManagement = (props) => {
  const { userInformation } = userGloabalContext();
  const { accessGranted, setAccessGranted } = props;

  /* useEffect(() => {
    const selectedAccessToSend = Object.entries(selectAccess).reduce(
      (acc, [category, actions]) => {
        // Filter out unchecked actions and map to the desired structure
        // console.log(actions, category, acc);
        const checkedActions = Object.entries(actions.access)
          .filter(([_, action]) => action.checked)
          .map(([_, action]) => action.name);
        // If there are any checked actions, add them to the accumulator
        console.log();
        if (checkedActions.length > 0) {
          acc[category] = checkedActions;
        }
        return acc;
      },
      {},
    );
    setSubmitAccess(selectedAccessToSend);
  }, [selectAccess]); */

  /* const handleCheckboxChange = (category, action) => {
    console.log(category, action);

    setSelectAccess((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        access: {
          ...prevState[category].access,
          [action]: {
            ...prevState[category].access[action],
            checked: !prevState[category].access[[action]].checked,
          },
        },
      },
    }));
  }; */

  /* useEffect(() => {
    console.log(accessGranted);

    return () => {};
  }, [accessGranted]); */

  const currentAccessPermissions = React.useMemo(() => {
    const permissionsFromBE = userInformation?.role?.SelectAccess;
    const currentUserPermissions = Object.keys(permissionsFromBE)
      .map((e) => {
        if (permissionsFromBE[e].length) {
          return {
            [e]: permissionsFromBE[e],
          };
        }
        return null;
      })
      .filter((e) => e)
      .reduce((a, b) => {
        return { ...a, ...b };
      }, {});
    const currentAccessPermissions = Object.keys(currentUserPermissions)
      .map((e) => ({ value: e, ...SelectAccess[e] }))
      .reduce((a, b) => {
        return { ...a, [b.value]: b };
      }, {});
    return currentAccessPermissions;
  }, [userInformation]);

  const handleAccordianCheckBox = (e, currentPermission) => {
    if (e.target.checked) {
      const p = currentPermission.access.reduce((a, b) => ({ ...a, [b]: true }), {});
      setAccessGranted({ ...accessGranted, [currentPermission.value]: p });
    } else {
      const tempAccess = { ...accessGranted };
      delete tempAccess?.[currentPermission.value];
      setAccessGranted(tempAccess);
    }
  };
  const handleSingleCheckboxChange = (e, currentPermission, f) => {
    if (!accessGranted?.[currentPermission.value]?.[f]) {
      setAccessGranted({
        ...accessGranted,
        [currentPermission.value]: {
          ...accessGranted?.[currentPermission.value],
          [f]: true,
        },
      });
    } else {
      setAccessGranted((prevValue) => {
        const newAccess = {
          ...prevValue,
          [currentPermission.value]: {
            ...prevValue?.[currentPermission.value],
            [f]: false,
          },
        };
        const isEmpty = Object.keys(newAccess?.[currentPermission.value] || {})?.filter(
          (e) => {
            return newAccess?.[currentPermission.value]?.[e];
          },
        ).length;
        if (!isEmpty) {
          delete newAccess?.[currentPermission.value];
        }	
        return newAccess;
      });
    }
  };

  const PermissionAccordian = (props) => {
    const { e: currentPermission } = props;
    const [collapse, setCollapse] = useState(false);

    return (
      <div className=" relative bg-gray-100">
        <div className="flex items-center">
          <label className="inline-flex items-center gap-2 cursor-pointer m-1">
            <input
              type="checkbox"
              className="hidden"
              checked={!!accessGranted?.[currentPermission.value]}
              onChange={(e) => handleAccordianCheckBox(e, currentPermission)}
            />

            <span className="flex items-center gap-2" id="select">
              {!!accessGranted?.[currentPermission.value] ? (
                <img src={checked} className="cursor-pointer" alt="checked" />
              ) : (
                <img src={unchecked} className="cursor-pointer" alt="unchecked" />
              )}
            </span>
            {currentPermission.name}
          </label>

          <div onClick={() => setCollapse(!collapse)}>
            {collapse ? (
              <img
                src={up}
                alt=""
                className="absolute top-[0%] right-[0%] w-6 h-6 bg-gray-100 rounded-full "
              />
            ) : (
              <img
                src={down}
                alt=""
                className=" absolute top-[0%] right-[0%]  w-6 h-6 bg-gray-100 rounded-full "
              />
            )}
          </div>
        </div>

        {!collapse ? (
          <div className="grid grid-cols-3 px-7 py-2 text-xs gap-1">
            {currentPermission.access.map((f) => {
              return (
                <div className="">
                  <label className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={!!accessGranted?.[currentPermission.value]?.[f]}
                      onChange={(e) =>
                        handleSingleCheckboxChange(e, currentPermission, f)
                      }
                      className="hidden"
                    />
                    <span className="flex items-center gap-2" id="select">
                      {!!accessGranted?.[currentPermission.value]?.[f] ? (
                        <img src={checked} className="cursor-pointer" alt="checked" />
                      ) : (
                        <img src={unchecked} className="cursor-pointer" alt="unchecked" />
                      )}
                    </span>
                    <span>{f}</span>
                  </label>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="overflow-auto  w-full flex flex-col gap-4 mb-5">
      {Object.keys(currentAccessPermissions).map((e) => {
        return <PermissionAccordian e={currentAccessPermissions[e]} />;
      })}
    </div>
  );
};

export default AccessManagement;
