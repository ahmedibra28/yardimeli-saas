import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../../HOC/withAuth'
import { confirmAlert } from 'react-confirm-alert'
import useResourcesHook from '../../../utils/api/resources'
import { Spinner, Message, Confirm } from '../../../components'
import { useRouter } from 'next/router'
import {
  FaFile,
  FaTimesCircle,
  FaDownload,
  FaArrowCircleLeft,
} from 'react-icons/fa'
import JsFileDownloader from 'js-file-downloader'

const ResourceDetails = () => {
  const { query, back } = useRouter()
  const { id } = query

  const url = typeof window !== 'undefined' && window.location.origin

  const downloadFile = (fileUrl) =>
    new JsFileDownloader({
      url: `${url}/${fileUrl}`,
    })

  const { getResourceDetails, deleteResourceFile } = useResourcesHook({
    id,
  })

  const { data, isLoading, isError, error } = getResourceDetails

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteResourceFile

  const deleteHandler = ({ _id, path }) => {
    confirmAlert(Confirm(() => mutateAsyncDelete({ _id, path })))
  }

  const label = 'Resource file'

  if (!data) {
    return (
      <div className='text-center mt-5'>
        <button className='btn btn-danger btn-sm' onClick={() => back()}>
          <FaArrowCircleLeft className='mb-1 me-2' />
          Resources were not found. Please go back
        </button>
      </div>
    )
  }

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

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='bg-light p-3 mt-2'>
          <div className='text-center font-monospace'>
            <h3>{data?.employee?.employeeId}</h3>
            <h3>{data?.employee?.name}</h3>
          </div>
          <hr />
          <div className='row'>
            {data?.files?.map((file, index) => (
              <div key={index} className='col-lg-3 col-md-4 col-6 mx-auto'>
                <div className='card border-0 shadow bg-transparent'>
                  <FaFile className='display-1 text-warning card-img-top mt-2' />

                  <div className='card-body text-center'>
                    <div className='card-text'>
                      <h6>{file?.name}</h6>
                      <p>{file?.description}</p>
                    </div>

                    <div className='btn-group'>
                      <button
                        disabled={isLoadingDelete}
                        onClick={() =>
                          deleteHandler({ _id: id, path: file.path })
                        }
                        className='btn btn-danger btn-sm ms-2'
                      >
                        {isLoadingDelete ? (
                          <span className='spinner-border spinner-border-sm' />
                        ) : (
                          <span>
                            <FaTimesCircle className='mb-1' /> Delete File
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => downloadFile(file.path)}
                        className='btn btn-success btn-sm ms-2'
                      >
                        <FaDownload className='mb-1' /> Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(ResourceDetails)), {
  ssr: false,
})
