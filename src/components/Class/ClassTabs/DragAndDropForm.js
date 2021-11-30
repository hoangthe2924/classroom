import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardActions, Typography, Divider, Container, CardContent, FormControl, Button, InputLabel, FilledInput, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';
import { useFormik } from "formik";

const data = [
    {
        id: 'gary',
        name: 'Gary Goodspeed'
    },
    {
        id: 'cato',
        name: 'Little Cato'
    },
    {
        id: 'kvn',
        name: 'KVN'
    },
    {
        id: 'mooncake',
        name: 'Mooncake'
    },
    {
        id: 'quinn',
        name: 'Quinn Ergon'
    }
]

export default function DragAndDropForm() {
    const [items, setItems] = useState(data);
    const [tempData, setTempData] = useState(null);
    const [onEditModeIndex, setOnEditModeIndex] = React.useState(-1);

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
        },
        onSubmit: async (values) => {

            const newItems = items.concat([{ id: values.id, name: values.name, }]);
            setItems(newItems);

        },
    });

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const itemList = Array.from(items);
        const [reorderedItem] = itemList.splice(result.source.index, 1);
        itemList.splice(result.destination.index, 0, reorderedItem);

        setItems(itemList);
        console.log(itemList);
    }

    const handleEditGradeTitle = (index, title) => {
        setTempData({ id: items[index].id, name: title });
    }

    const handleEditGradeDetail = (index, detail) => {
        setTempData({ id: items[index].id, name: detail });
    }


    const handleEditGradeForm = async (index) => {
        setTempData({ id: items[index].id, name: items[index].name });
        setOnEditModeIndex(index);
    }

    const handleSaveGradeForm = async (index) => {

        let p1 = items.slice(0, index);
        let p2 = [tempData];
        let p3 = items.slice(index + 1);
        const newItems = p1.concat(p2).concat(p3);
        setItems(newItems);
        setOnEditModeIndex(-1);
        setTempData(null);
    }

    const handleDeleteGradeForm = async (index) => {
        let p1 = items.slice(0, index);
        let p2 = items.slice(index + 1);
        const newItems = p1.concat(p2);
        setItems(newItems);
    }


    return (
        <React.Fragment>
            <Card sx={{ minWidth: 400 }}>
                <CardContent >
                    <Typography
                        variant={"h4"}
                        align="center"
                        gutterBottom
                    >
                        Class Grade Structure
                    </Typography>
                    <Typography
                        variant={"h6"}
                        align="center"
                    >
                        Drag and Drop to change Grade Structure
                    </Typography>
                    <Divider />
                    <Container maxWidth="lg">
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="characters">
                                {(provided) => (
                                    <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                        {items.map(({ id, name }, index) => {
                                            return (
                                                <Draggable key={id} draggableId={id} index={index}>
                                                    {(provided) => (
                                                        <Card
                                                            variant="outlined"
                                                            sx={{ m: 2 }}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <CardContent>
                                                                <FormControl variant="filled" sx={{ marginBottom: 3, width: '80%' }}>
                                                                    <InputLabel htmlFor="form-title">Grade Title</InputLabel>
                                                                    <FilledInput id="form-title" value={(onEditModeIndex === index) ? tempData['id'] : id}
                                                                        disabled={!(onEditModeIndex === index)}
                                                                        onChange={(e) => { handleEditGradeTitle(index, e.target.value) }} />
                                                                </FormControl>

                                                                <FormControl variant="filled" sx={{ marginBottom: 0, width: '80%' }}>
                                                                    <InputLabel htmlFor="form-detail">Grade Detail</InputLabel>
                                                                    <FilledInput id="form-detail" value={(onEditModeIndex === index) ? tempData['name'] : name}
                                                                        disabled={!(onEditModeIndex === index)}
                                                                        onChange={(e) => { handleEditGradeDetail(index, e.target.value) }} />
                                                                </FormControl>
                                                            </CardContent>
                                                            <CardActions disableSpacing>
                                                                {
                                                                    onEditModeIndex === index
                                                                        ?
                                                                        <Button size="small" color="primary"
                                                                            onClick={() => { handleSaveGradeForm(index) }}
                                                                            endIcon={<SaveIcon />}
                                                                        >
                                                                            Save
                                                                        </Button>
                                                                        :

                                                                        <Button size="small" color="primary"
                                                                            endIcon={<EditIcon />}
                                                                            onClick={() => { handleEditGradeForm(index) }}
                                                                        >
                                                                            Edit
                                                                        </Button>
                                                                }

                                                                <Button size="small" color="secondary"
                                                                    endIcon={<DeleteIcon />}
                                                                    onClick={() => { handleDeleteGradeForm(index) }}>
                                                                    Remove
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>

                        <Card
                            variant="outlined"
                            sx={{ m: 2 }}
                        >
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" >
                                    Add New
                                </Typography>
                                <form onSubmit={formik.handleSubmit}>

                                    <TextField
                                        required
                                        margin="dense"
                                        id="id"
                                        name="id"
                                        label="Grade Title"
                                        type="text"
                                        value={formik.values.id}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        variant="standard"
                                    />

                                    <TextField
                                        required
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Grade Detail"
                                        type="text"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        fullWidth
                                        variant="standard"
                                    />
                                </form>

                            </CardContent>
                            <CardActions disableSpacing>
                                <Button size="small" color="secondary"
                                    endIcon={<CheckIcon />}
                                    onClick={formik.handleSubmit}>
                                    Confirm
                                </Button>

                            </CardActions>
                        </Card>

                    </Container>
                </CardContent>
            </Card>

        </React.Fragment>
    );
}
