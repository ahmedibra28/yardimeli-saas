import { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../../HOC/withAuth'
import { confirmAlert } from 'react-confirm-alert'
import { useForm } from 'react-hook-form'
import useEmployeesHook from '../../../utils/api/human-resource/employees'
import useDepartmentsHook from '../../../utils/api/human-resource/departments'
import usePositionsHook from '../../../utils/api/human-resource/positions'
import { Spinner, Pagination, Message, Confirm } from '../../../components'
import {
  dynamicInputSelect,
  inputDate,
  inputEmail,
  inputNumber,
  inputText,
  staticInputSelect,
} from '../../../utils/dynamicForm'
import TableView from '../../../components/TableView'
import FormView from '../../../components/FormView'
import moment from 'moment'

const Employees = () => {
  const [page, setPage] = useState(1)
  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)
  const [q, setQ] = useState('')

  const { getEmployees, postEmployee, updateEmployee, deleteEmployee } =
    useEmployeesHook({
      page,
      q,
    })
  const { getDepartments } = useDepartmentsHook({
    page,
    q,
    limit: 10000000,
  })
  const { getPositions } = usePositionsHook({
    page,
    q,
    limit: 10000000,
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  })

  const { data, isLoading, isError, error, refetch } = getEmployees
  const { data: departmentData } = getDepartments
  const { data: positionData } = getPositions

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateEmployee

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteEmployee

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postEmployee

  useEffect(() => {
    if (isSuccessPost || isSuccessUpdate) formCleanHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessPost, isSuccessUpdate])

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    if (!q) refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  const searchHandler = (e) => {
    e.preventDefault()
    refetch()
    setPage(1)
  }

  // TableView
  const table = {
    header: [
      'Employee ID',
      'Name',
      'Mobile',
      'Department',
      'Position',
      'Status',
    ],
    body: [
      'employeeId',
      'name',
      'mobile',
      'department.name',
      'position.name',
      'status',
    ],
    data: data,
    hiredDate: 'hiredDate',
  }

  const editHandler = (item) => {
    setId(item._id)

    table.body.map((t) => setValue(t, item[t]))
    setValue('department', item.department?._id)
    setValue('position', item.position?._id)
    setValue('nationality', item.nationality)
    setValue('gender', item.gender)
    setValue('contract', item.contract)
    setValue('email', item.email)
    setValue('hiredDate', moment(item.hiredDate).format('YYYY-MM-DD'))
    setValue('dob', moment(item.dob).format('YYYY-MM-DD'))
    setValue('bankName', item.bankName)
    setValue('bankAccount', item.bankAccount)

    setEdit(true)
  }

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => mutateAsyncDelete(id)))
  }

  const name = 'Employees List'
  const label = 'Employee'
  const modal = 'employee'
  const searchPlaceholder = 'Search by name or id'

  // FormView
  const formCleanHandler = () => {
    reset(), setEdit(false)
  }

  const submitHandler = (data) => {
    edit
      ? mutateAsyncUpdate({
          _id: id,
          ...data,
        })
      : mutateAsyncPost(data)
  }

  const form = [
    inputText({
      register,
      errors,
      label: 'Employee ID',
      name: 'employeeId',
      placeholder: 'Enter employee id',
    }),
    inputText({
      register,
      errors,
      label: 'Name',
      name: 'name',
      placeholder: 'Enter name',
    }),
    staticInputSelect({
      register,
      errors,
      label: 'Gender',
      name: 'gender',
      placeholder: 'Select gender',
      data: [{ name: 'Male' }, { name: 'Female' }],
    }),
    inputNumber({
      register,
      errors,
      label: 'Mobile',
      name: 'mobile',
      placeholder: 'Enter mobile number',
    }),
    staticInputSelect({
      register,
      errors,
      label: 'Contract',
      name: 'contract',
      placeholder: 'Select contract',
      data: [{ name: 'Permanent' }, { name: 'Temporary' }],
    }),
    inputEmail({
      register,
      errors,
      label: 'Email',
      name: 'email',
      placeholder: 'Enter email address',
      isRequired: false,
    }),
    inputDate({
      register,
      errors,
      label: 'Hired Date',
      name: 'hiredDate',
      placeholder: 'Enter hired date',
    }),
    staticInputSelect({
      register,
      errors,
      label: 'Nationality',
      name: 'nationality',
      placeholder: 'Select nationality',
      data: [
        { name: 'Somali' },
        { name: 'Egyptian' },
        { name: 'Turkish' },
        { name: 'Kazakh' },
        { name: 'Ukrainian' },
        { name: 'Russian' },
        { name: 'Syrian' },
      ],
    }),
    inputDate({
      register,
      errors,
      label: 'Date Of Birth',
      name: 'dob',
      placeholder: 'Enter date of birth',
    }),
    dynamicInputSelect({
      register,
      errors,
      label: 'Department',
      name: 'department',
      placeholder: 'Select department',
      data: departmentData?.data,
      value: 'name',
    }),
    dynamicInputSelect({
      register,
      errors,
      label: 'Position',
      name: 'position',
      placeholder: 'Select position',
      data: positionData?.data,
      value: 'name',
    }),
    staticInputSelect({
      register,
      errors,
      label: 'Bank Name',
      name: 'bankName',
      placeholder: 'Select bank name',
      data: [
        { name: 'Salaam Bank' },
        { name: 'IBS Bank' },
        { name: 'Premier Bank' },
      ],
      isRequired: false,
    }),
    inputText({
      register,
      errors,
      label: 'Bank Account Number',
      name: 'bankAccount',
      placeholder: 'Enter bank account number',
      isRequired: false,
    }),
  ]

  const row = true
  const column = 'col-md-6 col-12'
  const modalSize = 'modal-lg'

  return (
    <>
      <Head>
        <title>Employees</title>
        <meta property='og:title' content='Employees' key='title' />
      </Head>

      {isSuccessDelete && (
        <Message variant='success'>
          {label} has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant='success'>
          {label} has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant='success'>
          {label} has been Created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant='danger'>{errorPost}</Message>}

      <div className='ms-auto text-end'>
        <Pagination data={table.data} setPage={setPage} />
      </div>

      <FormView
        edit={edit}
        formCleanHandler={formCleanHandler}
        form={form}
        watch={watch}
        isLoadingUpdate={isLoadingUpdate}
        isLoadingPost={isLoadingPost}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        modal={modal}
        label={label}
        column={column}
        row={row}
        modalSize={modalSize}
      />

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <TableView
          table={table}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          searchHandler={searchHandler}
          isLoadingDelete={isLoadingDelete}
          name={name}
          label={label}
          modal={modal}
          setQ={setQ}
          q={q}
          searchPlaceholder={searchPlaceholder}
          searchInput={true}
          addBtn={true}
        />
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Employees)), {
  ssr: false,
})
