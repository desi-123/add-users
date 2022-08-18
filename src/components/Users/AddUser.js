import { useState } from 'react'
import Button from '../UI/Button'
import Card from '../UI/Card'
import ErrorModal from '../UI/ErrorModal'
import classes from './AddUser.module.css'
const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('')
  const [enteredAge, setEnteredAge] = useState('')
  const [error, setError] = useState(false)

  const usernameChangeHandler = (e) => {
    setEnteredUsername(e.target.value)
  }

  const ageChangeHandler = (e) => {
    setEnteredAge(e.target.value)
  }

  const addUserHandler = (e) => {
    e.preventDefault()

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty).',
      })
    }

    if (enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      })
    }
    props.onAddUser(enteredUsername, enteredAge)
    setEnteredAge('')
    setEnteredUsername('')
  }

  const errorHandler = () => {
    setError(null)
  }
  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            onChange={usernameChangeHandler}
            value={enteredUsername}
            type="text"
            id="username"
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            onChange={ageChangeHandler}
            value={enteredAge}
            type="number"
            id="age"
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  )
}

export default AddUser
