import React, { useState } from 'react'

import * as Types from './interfaces'

const Context = React.createContext({} as Types.UseFormReturn)

const useContext = () => React.useContext(Context)

const defaults: Types.FormState = {
  /* States do Form */
  type: 'M',
  recipients: [],
  copyRecipients: [],
  subject: '',
  highlightDate: ['', ''],
  body: '',
  files: [],
  posts: [],

  /* States de Controle */
  modal: null,
  showCopy: false,
  recipientType: 'P',
  reply: {
    title: '',
    body: '',
  },
  loading: false,
  editorDisabled: false,
}

export const Provider: Types.TabComponent['Provider'] = (props) => {
  /* States do Form */
  const [type, setType] = useState<Types.FormState['type']>(defaults['type'])
  const [recipients, setRecipients] = useState<Types.FormState['recipients']>(
    defaults['recipients'],
  )
  const [copyRecipients, setCopyRecipients] = useState<
    Types.FormState['copyRecipients']
  >(defaults['copyRecipients'])
  const [subject, setSubject] = useState<Types.FormState['subject']>(
    defaults['subject'],
  )
  const [highlightDate, setHighlightDate] = useState<
    Types.FormState['highlightDate']
  >(defaults['highlightDate'])
  const [body, setBody] = useState<Types.FormState['body']>(defaults['body'])
  const [files, setFiles] = useState<Types.FormState['files']>(
    defaults['files'],
  )
  const [posts, setPosts] = useState<Types.FormState['posts']>(
    defaults['posts'],
  )

  /* States de Controle */
  const [modal, setModal] = useState<Types.FormState['modal']>(
    defaults['modal'],
  )
  const [showCopy, setShowCopy] = useState<Types.FormState['showCopy']>(
    defaults['showCopy'],
  )
  const [recipientType, setRecipientType] = useState<
    Types.FormState['recipientType']
  >(defaults['recipientType'])
  const [reply, setReply] = useState<Types.FormState['reply']>(
    defaults['reply'],
  )
  const [loading, setLoading] = useState<Types.FormState['loading']>(
    defaults['loading'],
  )
  const [editorDisabled, setEditorDisabled] = useState<
    Types.FormState['editorDisabled']
  >(defaults['editorDisabled'])

  const setters: {
    [K in keyof Types.FormState]: React.Dispatch<
      React.SetStateAction<Types.FormState[K]>
    >
  } = {
    type: setType,
    recipients: setRecipients,
    copyRecipients: setCopyRecipients,
    subject: setSubject,
    highlightDate: setHighlightDate,
    body: setBody,
    files: setFiles,
    posts: setPosts,
    modal: setModal,
    showCopy: setShowCopy,
    recipientType: setRecipientType,
    reply: setReply,
    loading: setLoading,
    editorDisabled: setEditorDisabled,
  }

  const set: Types.UseFormReturn['set'] = (state, value) => {
    setters[state](value)
  }

  const reset: Types.UseFormReturn['reset'] = (v) => {
    const values = v || {}
    ;(Object.keys(defaults) as (keyof typeof defaults)[]).forEach((state) => {
      const value = values[state] || defaults[state]
      set(...([state, value] as Parameters<typeof set>))
    })
  }

  return (
    <Context.Provider
      children={props.children}
      value={{
        values: {
          type,
          recipients,
          copyRecipients,
          subject,
          highlightDate,
          body,
          files,
          posts,
          modal,
          showCopy,
          recipientType,
          reply,
          loading,
          editorDisabled,
        },
        reset,
        set,
      }}
    />
  )
}

export default useContext
