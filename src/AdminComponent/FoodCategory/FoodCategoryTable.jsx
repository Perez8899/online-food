import { Box, Card, CardHeader, Divider, Fade, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { Create, Delete, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import CreateCategory from './CreateCategory';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'secondary.main',
  boxShadow: 24,
  outline: "none",
  p: 4,
};

//const orders = [1, 1, 1, 1, 1, 1, 1];

const FoodCategoryTable = () => {
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector(store => store)
  const jwt = localStorage.getItem("jwt")

  const [openCreateCategory, setOpenCreateCategory] = React.useState(false);
  const handleOpenCreateCategory = () => setOpenCreateCategory(true);
  const handleCloseCreateCategory = () => setOpenCreateCategory(false);

  console.log("Restaurant Details", restaurant)



  return (
    // MenuTable header
    <Box>
      <Card className='mt-1'>
        <CardHeader
          action={
            //onClick={() => navigate("/admin/restaurant/add-menu")}
            <IconButton onClick={handleOpenCreateCategory}>
              <Create color="primary" />
            </IconButton>
          }

          title={"Categorias"}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }} />
        {/* MenuTable body */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell align="left"
                  sx={{
                    position: "relative",
                    paddingRight: 2,

                    width: "20%",
                  }}>
                  Id
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      height: "60%",
                      borderRightWidth: 2,
                      borderColor: "white",
                    }}
                  />
                </TableCell>
                <TableCell align="right ">Nombre</TableCell>

              </TableRow>
            </TableHead>
            {/* -------------------------------------------------------------------------------- */}
            <TableBody>
              {restaurant.categories.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left"
                  sx={{
                    position: "relative",
                    paddingRight: 2,

                    width: "20%",
                  }}>{item?.id}
                    <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      height: "60%",
                      borderRightWidth: 2,
                      borderColor: "white",
                    }}
                  />
                  </TableCell>


                  <TableCell className="">
                    {item.name}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal
        open={openCreateCategory}
        onClose={handleCloseCreateCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={openCreateCategory} timeout={800}>
          <Box sx={style}>
            <CreateCategory handleClose={handleCloseCreateCategory} />  {/* CreateCategory.jsx */}
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}

export default FoodCategoryTable
