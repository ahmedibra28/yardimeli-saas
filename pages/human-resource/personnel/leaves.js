import { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../../HOC/withAuth'
import { confirmAlert } from 'react-confirm-alert'
import { useForm } from 'react-hook-form'
import useLeavesHook from '../../../utils/api/human-resource/leaves'
import useEmployeesHook from '../../../utils/api/human-resource/employees'
import { Spinner, Pagination, Message, Confirm } from '../../../components'
import {
  InputAutoCompleteSelect,
  inputDate,
  inputTextArea,
  staticInputSelect,
} from '../../../utils/dynamicForm'
import TableView from '../../../components/TableView'
import FormView from '../../../components/FormView'

const Leaves = () => {
  const [page, setPage] = useState(1)
  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)
  const [q, setQ] = useState('')

  const { getLeaves, postLeave, updateLeave, deleteLeave } = useLeavesHook({
    page,
    q,
  })
  const { getEmployees } = useEmployeesHook({
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
    defaultValues: {
      auth: true,
    },
  })

  const { data, isLoading, isError, error, refetch } = getLeaves
  const { data: employeeData } = getEmployees

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateLeave

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteLeave

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postLeave

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
      'Emp. ID',
      'Name',
      'Leave',
      'Start Date',
      'End Date',
      'Description',
    ],
    body: [
      'employee.employeeId',
      'employee.name',
      'type',
      'startDate',
      'endDate',
      'description',
    ],
    data: data,
  }

  const editHandler = (item) => {
    setId(item._id)

    table.body.map((t) => setValue(t, item[t]))
    setValue('employee', item.employee._id)
    setEdit(true)
  }

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => mutateAsyncDelete(id)))
  }

  const name = 'Leaves List'
  const label = 'Leave'
  const modal = 'leave'
  const searchPlaceholder = 'Search by employee id'

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
    InputAutoCompleteSelect({
      register,
      errors,
      label: 'Employee',
      name: 'employee',
      placeholder: 'Enter employee',
      data: employeeData?.data,
      value: 'employeeId',
    }),
    staticInputSelect({
      register,
      errors,
      label: 'Leave Type',
      name: 'type',
      placeholder: 'Select leave type',
      data: [
        { name: 'Sick Leave' },
        { name: 'Casual leave' },
        { name: 'Public holiday' },
        { name: 'Religious holidays' },
        { name: 'Maternity leave' },
        { name: 'Paternity leave' },
        { name: 'Bereavement leave' },
        { name: 'Compensatory leave' },
        { name: 'Sabbatical leave' },
        { name: 'Unpaid Leave' },
        { name: 'Annual Leave' },
        { name: 'Marriage Leave' },
      ],
    }),
    inputDate({
      register,
      errors,
      label: 'Start Date',
      name: 'startDate',
      placeholder: 'Enter start date',
    }),
    inputDate({
      register,
      errors,
      label: 'End Date',
      name: 'endDate',
      placeholder: 'Enter end date',
    }),
    inputTextArea({
      register,
      errors,
      label: 'Description',
      name: 'description',
      placeholder: 'Enter description',
    }),
  ]

  const row = false
  const column = 'col-md-6 col-12'
  const modalSize = 'modal-md'

  return (
    <>
      <Head>
        <title>Leaves</title>
        <meta property='og:title' content='Leaves' key='title' />
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

export default dynamic(() => Promise.resolve(withAuth(Leaves)), {
  ssr: false,
})
