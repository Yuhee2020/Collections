import { useState } from 'react'

import { Progress } from 'antd'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { FileUploader } from 'react-drag-drop-files'

import { perc } from '../../constants'
import { storage } from '../../firebase'

import s from './imageUploader.module.scss'

type PropsType = {
  setImageUrl: (url: string) => void
}

export const ImageUploader = ({ setImageUrl }: PropsType) => {
  const fileTypes = ['JPG', 'PNG', 'GIF', 'JPEG']
  const [percent, setPercent] = useState(0)

  const handleUpload = (file: File) => {
    const storageRef = ref(storage, `/files/${file?.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * perc,
        )

        setPercent(percent)
      },
      err => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          setImageUrl(url)
        })
      },
    )
  }

  return (
    <div>
      <div className={s.uploaderBox}>
        <FileUploader
          handleChange={handleUpload}
          name="file"
          types={fileTypes}
          label="Upload or drop image right here"
        />
      </div>
      <Progress percent={percent} />
    </div>
  )
}
