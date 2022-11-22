import React, {FC, useEffect, useState} from 'react';
import {IGraduationProject} from "../CourseList/DiplomeElement";
import {Accordion, Button, Dropdown, Modal} from "react-bootstrap";
import CircularProgress from "@mui/material/CircularProgress";
import UserStore, {IUser} from "../../../mobx/stores/user.store";
import s from './TeacherProjectsCheckking.module.sass'
import DiplomeService from "../../../mobx/services/diplom.service";

const DiplomeProject: FC<IGraduationProject> = ({id, user_student_id, percent_of_completion, theme, pattern_of_education, stages}) => {
    const [user_student, setUserStudent] = useState<IUser>()
    const [modalDiplomeEditShow, setModalDiplomeEditShow] = useState(false);


    useEffect(() => {
        UserStore.getUserById(String(user_student_id)).then(data => setUserStudent(data))
    },[])

    const handleSetIsDone = (stage_id: number) => {
        if (stage_id != undefined){
            DiplomeService.setIsDoneForStage(stage_id).then(data => console.log(data.data))
        }
    }

    return (
        <div>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <CircularProgress variant="determinate" value={percent_of_completion != undefined? (percent_of_completion * 100) : (percent_of_completion)} />
                            <div className={s.title_diplome}>
                                <div>
                                    Тема: {theme}
                                </div>
                                <div className={s.title_diplome__name}>
                                    Студнент: {user_student?.name} {user_student?.surname}
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className={s.title_diplome}>
                                <div>
                                    Методические указания:
                                </div>
                                <div>
                                    <button type="button" className="btn btn-default" onClick={() => setModalDiplomeEditShow(true)}>
                                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                            {stages?.map(stage => (
                                <div>
                                    <Accordion>
                                        <Accordion.Item eventKey={String(stage.id)}>
                                            <Accordion.Header>
                                                {stage.title}
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className={s.title_diplome}>
                                                    <div>
                                                        <div>{stage.description}</div>
                                                        <div>СТАТУС: {stage.is_done ? (<>Сделано</>): (<>Не сделано</>)}</div>
                                                        <div>{stage.deadline_date}</div>
                                                    </div>
                                                    <div>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                                                Настройки стадии
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#/action-1">Редактировать</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2">Удалить</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => {
                                                                    handleSetIsDone(stage.id)
                                                                }}>{!stage.is_done ? (<p>Завершить</p>) : (<p>Отменить</p>)}</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            <Modal show={modalDiplomeEditShow} onHide={() => setModalDiplomeEditShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalDiplomeEditShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setModalDiplomeEditShow(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DiplomeProject;

class MydModalWithGrid extends React.Component<{ show: any, onHide: any }> {
    render() {
        let {show, onHide} = this.props;
        return (
            <Modal show={show} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Using Grid in Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}