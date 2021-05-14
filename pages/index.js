import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import configureStore from '../components/store.ts'
import { ITaskState, STATUS_TYPES } from '../components/types.ts'
import { Provider } from 'react-redux'
import { Normalize } from 'styled-normalize'
import StatusBoard from '../components/StatusBoardContainer.tsx'

export default function Home() {
	const store = configureStore()

  return (
    <div className={styles.container}>
			<Provider store={store}>
				<StatusBoard />
			</Provider>
    </div>
  )
}
