import { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../../../HOC/withAuth'
import { confirmAlert } from 'react-confirm-alert'
import { useForm } from 'react-hook-form'
import useResourcesHook from '../../../../utils/api/human-resource/resources'
import useEmployeesHook from '../../../../utils/api/human-resource/employees'
import useUploadHook from '../../../../utils/api/human-resource/upload'
import { Spinner, Pagination, Message, Confirm } from '../../../../components'
import {
  InputAutoCompleteSelect,
  inputFile,
  inputTextArea,
} from '../../../../utils/dynamicForm'
import ResourcesTableView from '../../../../components/ResourcesTableView'
import FormView from '../../../../components/FormView'

const Resources = () => {
  const [page, setPage] = useState(1)
  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)
  const [q, setQ] = useState('')
  const [file, setFile] = useState('')
  const [files, setFiles] = useState([])

  const { getResources, postResource, updateResource, deleteResource } =
    useResourcesHook({
      page,
      q,
    })
  const { getEmployees } = useEmployeesHook({
    page,
    q,
    limit: 10000000,
  })
  const { postUpload } = useUploadHook()

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

  const { data, isLoading, isError, error, refetch } = getResources
  const { data: employeeData } = getEmployees

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateResource

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteResource

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postResource

  const {
    isLoading: isLoadingUpload,
    isError: isErrorUpload,
    error: errorUpload,
    data: dataUpload,
    isSuccess: isSuccessUpload,
    mutateAsync: mutateAsyncUpload,
  } = postUpload

  useEffect(() => {
    if (isSuccessUpload) {
      setFiles(dataUpload?.filePaths)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpload])

  useEffect(() => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      mutateAsyncUpload({ type: 'file', formData })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

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

  // ResourcesTableView
  const table = {
    header: ['Emp. ID', 'Name', 'Description'],
    body: ['employee.employeeId', 'employee.name', 'description'],
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

  const name = 'Resources List'
  const label = 'Resource'
  const modal = 'resource'
  const searchPlaceholder = 'Search by employee id'

  // FormView
  const formCleanHandler = () => {
    reset(), setEdit(false)
  }

  const submitHandler = (data) => {
    edit
      ? mutateAsyncUpdate({
          _id: id,
          employee: data.employee,
          description: data.description,
          files: files,
        })
      : mutateAsyncPost({
          employee: data.employee,
          description: data.description,
          files: files,
        })
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
    inputFile({
      register,
      errors,
      label: 'Files',
      name: 'files',
      placeholder: 'Upload files',
      setFile,
      isRequired: false,
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
        <title>Resources</title>
        <meta property='og:title' content='Resources' key='title' />
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

      {isErrorUpload && <Message variant='danger'>{errorUpload}</Message>}

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
        isLoadingUpload={isLoadingUpload}
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
        <ResourcesTableView
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

export default dynamic(() => Promise.resolve(withAuth(Resources)), {
  ssr: false,
})
