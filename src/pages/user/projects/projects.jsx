/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { getProjects, deleteProject} from '../../../utils/requestHandler'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import getUser from '../../../utils/getCurrentUser'
import './projects.css'
import "bootstrap/dist/css/bootstrap.min.css";

function Projects(){
  const [projects, setProjects] = useState(false)
  const [user, setUser] = useState({})
  const history = useHistory()

  useEffect(async () => {
    const user = getUser()
    const project = await getProjects(user)
    console.log(project)
    setUser(user)
    setProjects(project.data.projects)
  }, [])

  const handleDelete = (projectId) => deleteProject(user, projectId)
  const parseData = (data) => data.split('.', 5)[0].split('T').join(' às ')

  return(
    <>
    { !projects ? 
    ( <h1>Recuperando seus projetos!</h1> ) : (

      <div className='main-div'>
        <div className='first-div'>

          {
          projects.map(project =>
          <>
          <Table key={project.id} variant="dark" borderless>
            <thead>
              <tr>
                <th>Nome do Projeto</th>
                <th>Descrição</th>
                <th>Afazeres</th>
                <th>Data de criação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>
                  { project.tasks.length === 0 ? <p>Não há tarefas neste projeto ainda</p> : project.tasks.map(task => <p>{task.title}</p>) }
                </td>
                <td>{parseData(project.createdAt)}</td>
              </tr>
            </tbody>
          </Table>
          <div style={{display:'flex',justifyContent:'flex-end', marginBottom:'10px'}}>
            <Button variant='warning' style={{marginRight: '30px'}} onClick ={(e) =>{e.preventDefault(); handleDelete(project._id)}}>Apagar tarefa</Button>
            <Button variant='danger' onClick ={(e) =>{e.preventDefault(); history.push('/update', {project}) }}>Modificar tarefa</Button>
          </div>
          </>
          )
          }
        </div>
      </div>
    )}
    </>
  )
    
}
 
export default Projects