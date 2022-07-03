import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import withAuth from '../../../../HOC/withAuth'
import { useForm } from 'react-hook-form'
import useEntriesHook from '../../../../utils/api/pregnancy-care/entries'
import {
  Spinner,
  ViewEntryImages,
  FormEntryImages,
  Message,
  RichTextEditor,
} from '../../../../components'

const Images = () => {
  const [q, setQ] = useState('')
  const [id, setId] = useState('')
  const [image, setImage] = useState({})
  const [text, setText] = useState('')

  const { postImageEntry, updateImageEntry } = useEntriesHook()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  })

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateImageEntry

  const {
    data: dataPost,
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    mutateAsync: mutateAsyncPost,
  } = postImageEntry

  const formCleanHandler = () => {
    reset()
    setText('')
  }

  useEffect(() => {
    if (isSuccessUpdate) formCleanHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpdate])

  const searchHandler = (e) => {
    e.preventDefault()
    mutateAsyncPost(q.toUpperCase())
  }

  const submitHandler = (data) => {
    mutateAsyncUpdate({
      _id: id,
      image: image[0].image,
      result: text,
    })
  }

  const editHandler = (image) => {
    setId(image._id)
    setImage(image.images)
  }

  return (
    <>
      <Head>
        <title>Images</title>
        <meta property='og:title' content='Images' key='title' />
        <meta charset='utf-8' />
      </Head>

      {isSuccessUpdate && (
        <Message variant='success'>
          Image has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {isErrorPost && <Message variant='danger'>{errorPost}</Message>}

      <FormEntryImages
        formCleanHandler={formCleanHandler}
        isLoadingUpdate={isLoadingUpdate}
        isLoadingPost={isLoadingPost}
        register={register}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        errors={errors}
        image={image}
        RichTextEditor={RichTextEditor}
        setText={setText}
      />

      {isLoadingPost ? (
        <Spinner />
      ) : (
        <ViewEntryImages
          data={dataPost}
          editHandler={editHandler}
          setQ={setQ}
          q={q}
          searchHandler={searchHandler}
        />
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(withAuth(Images)), {
  ssr: false,
})
