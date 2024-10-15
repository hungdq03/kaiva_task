

import clsx from 'clsx'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { PasswordMeterComponent } from '../../../../_metronic/assets/ts/components'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { registerAPI } from '../../../api/auth'
const initialValues = {
  username: '',
  full_name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const registrationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Tên người dùng không được để trống'),
  email: Yup.string()
    .email('Email không đúng định dạng')
    .required('Email không được để trống'),
  full_name: Yup.string()
    .required('Tên đầy đủ không được để trống'),
  password: Yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Mật khẩu tối thiểu 8 kí tự bao gồm: chữ, số, kí tự đặc biệt')
    .required('Mật khẩu không được để trống'),
  confirmPassword: Yup.string()
    .required('Xác nhận mật khẩu không được để trống')
    .oneOf([Yup.ref('password')], "Xác nhận mật khẩu không trùng khớp với mật khẩu"),
})

export function Registration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const res = await registerAPI(
          values.username,
          values.email,
          values.full_name,
          values.password,
        )

        toast.success(res.data.msg)
        navigate('/auth/login')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error)
        setStatus(error.response.data.detail)
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        {/* begin::Title */}
        <h1 className='text-gray-900 fw-bolder mb-3'>Đăng ký</h1>
        {/* end::Title */}

        <div className='text-gray-500 fw-semibold fs-6'>Kaiva</div>
      </div>
      {/* end::Heading */}

      {/* begin::Login options */}
      <div className='row g-3 mb-9'>
        {/* begin::Col */}
        <div className='col-md-6'>
          {/* begin::Google link */}
          <a
            href='#'
            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
          >
            <img
              alt='Logo'
              src={toAbsoluteUrl('media/svg/brand-logos/google-icon.svg')}
              className='h-15px me-3'
            />
            Đăng ký với Google
          </a>
          {/* end::Google link */}
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-md-6'>
          {/* begin::Google link */}
          <a
            href='#'
            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
          >
            <img
              alt='Logo'
              src={toAbsoluteUrl('media/svg/brand-logos/facebook-2.svg')}
              className='h-15px me-3'
            />

            Đăng ký với Facebook
          </a>
          {/* end::Google link */}
        </div>
        {/* end::Col */}
      </div>
      {/* end::Login options */}

      <div className='separator separator-content my-14'>
        <span className='w-350px text-gray-500 fw-semibold fs-7'>Hoặc với email</span>
      </div>

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Firstname */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Tên người dùng</label>
        <input
          placeholder='Tên người dùng'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('username')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.username && formik.errors.username,
            },
            {
              'is-valid': formik.touched.username && !formik.errors.username,
            }
          )}
        />
        {formik.touched.username && formik.errors.username && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.username}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}
      <div className='fv-row mb-8'>
        {/* begin::Form group Lastname */}
        <label className='form-label fw-bolder text-gray-900 fs-6'>Tên đầy đủ</label>
        <input
          placeholder='Tên đầy đủ'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('full_name')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.full_name && formik.errors.full_name,
            },
            {
              'is-valid': formik.touched.full_name && !formik.errors.full_name,
            }
          )}
        />
        {formik.touched.full_name && formik.errors.full_name && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.full_name}</span>
            </div>
          </div>
        )}
        {/* end::Form group */}
      </div>

      {/* begin::Form group Email */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className='fv-row mb-8' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>Mật khẩu</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Mật khẩu'
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          <div
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
          </div>
          {/* end::Meter */}
        </div>
        <div className='text-muted'>
          Mật khẩu tối thiểu 8 kí tự bao gồm: chữ, số, kí tự đặc biệt
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Xác nhận mật khẩu</label>
        <input
          type='password'
          placeholder='Xác nhận mật khẩu'
          autoComplete='off'
          {...formik.getFieldProps('confirmPassword')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword,
            },
            {
              'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword,
            }
          )}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.confirmPassword}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Đăng ký</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Vui lòng đợi trong giây lát{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Hủy
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
