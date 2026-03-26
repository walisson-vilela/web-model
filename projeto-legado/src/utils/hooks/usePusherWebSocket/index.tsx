import { ReactNode, createContext, useContext, useState } from 'react'

import Pusher, { Channel } from 'pusher-js'
import { v4 as uuidv4 } from 'uuid'

import { getToken } from '../..'

type onMessage = (data: any, event: WebSocketEventMap['message']) => void

// chave event_id
export type Events = { [key: string | number]: onMessage }

interface ContextInterface {
  pusher: Pusher
  subscribe: (channel_id: string, events: Events, uuid: string) => void
  unsubscribe: (channel_id: string, uuid: string) => void
  addEvents: (channel_id: string, events: Events, uuid: string) => void
  removeEvents: (
    channel_id: string,
    events: (string | number)[],
    uuid: string,
  ) => void
  setEvents: (channel_id: string, events: Events, uuid: string) => void
}

interface MyChannel {
  channel: Channel
  binds: {
    // chave uuid
    [key: string | number]: Events
  }
}

const WebSocketContext = createContext<ContextInterface>({} as ContextInterface)

// TODO: move to env
const CLIENT_KEY = '2eff7e28a50d50a3b593'
const CLIENT_CLUSTER = 'mt1'

export const WebSocketProvider = (props: { children: ReactNode }) => {
  const [channels, setChannels] = useState<MyChannel[]>([])
  const [pusher] = useState<Pusher>(() => {
    return new Pusher(CLIENT_KEY, {
      cluster: CLIENT_CLUSTER,
    })
  })

  const getChannelIndex = (channel_id: string, state?: MyChannel[]): number => {
    state = state !== undefined ? state : channels

    const channel = state.findIndex((channel: MyChannel): boolean => {
      return channel.channel.name === channel_id
    })

    if (channel === -1)
      throw new Error(`There is no subscribe to channel "${channel_id}"`)

    return channel
  }

  const rebind = (channel: MyChannel): void => {
    channel.channel.unbind_all()

    Object.keys(channel.binds).forEach((uuid) => {
      const binds = channel.binds[uuid]

      Object.keys(binds).forEach((event_id) => {
        channel.channel.bind(event_id, binds[event_id])
      })
    })
  }

  const subscribe = (channel_id: string, events: Events, uuid: string) => {
    setChannels((prevChannels: MyChannel[]) => {
      let newChannels = [...prevChannels]

      let index: number

      try {
        index = getChannelIndex(channel_id, newChannels)
      } catch (e) {
        index =
          newChannels.push({
            channel: pusher.subscribe(channel_id),
            binds: {},
          }) - 1
      }

      newChannels[index].binds = {
        ...newChannels[index].binds,
        [uuid]: events,
      }

      rebind(newChannels[index])

      return newChannels
    })
  }

  const unsubscribe = (channel_id: string, uuid: string) => {
    setChannels((prevChannels: MyChannel[]) => {
      const newChannels = [...prevChannels]

      const index = getChannelIndex(channel_id, newChannels)

      if (Object.keys(newChannels[index].binds).some((key) => key !== uuid)) {
        delete newChannels[index].binds[uuid]

        rebind(newChannels[index])

        return newChannels
      }

      pusher.unsubscribe(channel_id)

      return newChannels.filter((c: MyChannel) => c.channel.name !== channel_id)
    })
  }

  const addEvents = (channel_id: string, events: Events, uuid: string) => {
    if (Object.keys(events).length === 0) {
      return
    }

    setChannels((prevChannels: MyChannel[]) => {
      const newChannels = [...prevChannels]

      const index = getChannelIndex(channel_id, newChannels)

      const prevEvents = newChannels[index].binds[uuid] || {}

      newChannels[index].binds[uuid] = {
        ...prevEvents,
        ...events,
      }

      rebind(newChannels[index])

      return newChannels
    })
  }

  const removeEvents = (
    channel_id: string,
    events: (string | number)[],
    uuid: string,
  ) => {
    if (Object.keys(events).length === 0) {
      return
    }

    events = events.map((e) => e.toString())

    setChannels((prevChannels: MyChannel[]) => {
      const newChannels = [...prevChannels]

      const index = getChannelIndex(channel_id, newChannels)

      if (!(uuid in newChannels[index].binds)) {
        return newChannels
      }

      newChannels[index].binds[uuid] = Object.keys(
        newChannels[index].binds[uuid],
      )
        .filter((event_id) => !events.includes(event_id))
        .reduce(
          (prev, event_id) => ({
            ...prev,
            [event_id]: newChannels[index].binds[uuid][event_id],
          }),
          {},
        )

      if (Object.keys(newChannels[index].binds[uuid]).length === 0)
        delete newChannels[index].binds[uuid]

      rebind(newChannels[index])

      return newChannels
    })
  }

  const setEvents = (channel_id: string, events: Events, uuid: string) => {
    if (Object.keys(events).length === 0) {
      return
    }

    setChannels((prevChannels: MyChannel[]) => {
      const newChannels = [...prevChannels]

      const index = getChannelIndex(channel_id, newChannels)

      newChannels[index].binds[uuid] = {
        ...events,
      }

      rebind(newChannels[index])

      return newChannels
    })
  }

  return (
    <WebSocketContext.Provider
      value={{
        pusher,
        subscribe,
        unsubscribe,
        addEvents,
        removeEvents,
        setEvents,
      }}
      {...props}
    />
  )
}

const useWebSocket = () => {
  const [uuid] = useState<string>(uuidv4())

  const {
    payload: { account, contractor, people },
  } = getToken()

  const context = useContext(WebSocketContext)

  const replacements = {
    $people: people,
    $contractor: contractor,
    $account: account,
  }

  const replace = (values: (string | number)[]): string[] => {
    return values.map((event_id) =>
      event_id in replacements ? replacements[event_id] : event_id,
    )
  }

  const getChannelId = (channel_id: string): string => {
    return replace(channel_id.split('.')).join('.')
  }

  const mapEventsObject = (events: Events): Events => {
    return Object.keys(events).reduce((prev, event_id) => {
      const key = event_id in replacements ? replacements[event_id] : event_id

      return {
        ...prev,
        [key]: events[event_id],
      }
    }, {})
  }

  return {
    ...context,

    subscribe: (channel_id: string, events: Events) => {
      channel_id = getChannelId(channel_id)
      events = mapEventsObject(events)
      context.subscribe(channel_id, events, uuid)
    },
    unsubscribe: (channel_id: string) => {
      channel_id = getChannelId(channel_id)
      context.unsubscribe(channel_id, uuid)
    },
    addEvents: (channel_id: string, events: Events) => {
      channel_id = getChannelId(channel_id)
      events = mapEventsObject(events)
      context.addEvents(channel_id, events, uuid)
    },
    removeEvents: (channel_id: string, events: (string | number)[]) => {
      channel_id = getChannelId(channel_id)
      events = replace(events)
      context.removeEvents(channel_id, events, uuid)
    },
    setEvents: (channel_id: string, events: Events) => {
      channel_id = getChannelId(channel_id)
      events = mapEventsObject(events)
      context.setEvents(channel_id, events, uuid)
    },
  }
}

export default useWebSocket
