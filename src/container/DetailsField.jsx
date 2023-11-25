/* eslint-disable react/prop-types */
import InputField from './InputField';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const DetailsField = ({name, title, val}) => {
	const initialValues = {
		name: '',
		address: '',
	};
	const validationSchema = Yup.object.shape({
		styleId: Yup.string().required('Required'),
		styleName: Yup.string().required('Required'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit: (values) => handleSubmit(values),
		validationSchema,
	});

	const handleSubmit = () => {};

	return (
		<>
			<div className=" flex flex-col gap-8">
				<span className="font-bold text-xl">{name}</span>
				<div className="flex gap-5">
					<div className="flex-1 h-5">
						<InputField
							name={'name'}
							label={'Name'}
							type="text"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.name && formik.errors.name}
							placeholder={'1234'}
							labelColor={'bg-slimeGray'}
							labelsize={'text-[10px]'}
							padding={'py-2'}
						/>
					</div>
					<InputField
						name={'address'}
						label={'Address'}
						type="text"
						value={formik.values.address}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.address && formik.errors.address}
						placeholder={'1234'}
						labelColor={'bg-slimeGray'}
						labelsize={'text-[10px]'}
						padding={'py-2'}
					/>
				</div>
			</div>
		</>
	);
};

export default DetailsField;
