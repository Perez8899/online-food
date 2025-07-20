import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteEventAction } from "../../components/State/Restaurant/Action";

const EventCard = ({ item, isCustomer }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleOpenConfirmDialog = () => setOpenConfirmDialog(true);
  const handleCloseConfirmDialog = () => setOpenConfirmDialog(false);

  const handleDeleteEvent = async () => {
    setLoading(true);
    setError(null);
    handleCloseConfirmDialog();
    
    try {
      await dispatch(deleteEventAction({ 
        eventId: item.id, 
        jwt: localStorage.getItem("jwt") 
      })).unwrap();
      
      setSuccess(true);
    } catch (error) {
      console.error("Error al eliminar evento:", error);
      setError(error.message || "Error al eliminar la promoción");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <div>
      <Card sx={{ 
        width: 345, 
        position: 'relative',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 3
        }
      }}>
        {loading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)',
            zIndex: 1
          }}>
            <CircularProgress color="error" />
          </div>
        )}

        <CardMedia
          sx={{ 
            height: 345,
            transition: 'transform 0.5s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)'
            },
          }}
          image={item.image}
          title={item.name}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div" noWrap>
            {item.restaurant.name}
          </Typography>
          <Typography variant="body1" fontWeight="bold" color="text.primary">
            {item.name}
          </Typography>
          <div className="py-2 space-y-2">
            <Typography variant="body2">
              <span style={{ fontWeight: 'bold' }}>Ubicación:</span> {item.location}
            </Typography>
            <Typography variant="caption" display="block" color="primary.main">
              <span style={{ fontWeight: 'bold' }}>Inicia:</span> {new Date(item.startedAt).toLocaleString()}
            </Typography>
            <Typography variant="caption" display="block" color="error.main">
              <span style={{ fontWeight: 'bold' }}>Finaliza:</span> {new Date(item.endsAt).toLocaleString()}
            </Typography>
          </div>
        </CardContent>

        {!isCustomer && (                               //IS  NOT CUSOMER BUTTON delete
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <IconButton 
              onClick={handleOpenConfirmDialog} 
              aria-label="Eliminar Promoción"
              disabled={loading}
              size="large"
            >
              <DeleteIcon color="error" fontSize="medium" />
            </IconButton>
          </CardActions>
        )}
      </Card>

      {/* Diálogo de confirmación */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: '12px',
            padding: '16px'
          }
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold', color: 'error.main' }}>
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: 'text.primary' }}>
            ¿Estás seguro de que deseas eliminar la promoción <strong>"{item.name}"</strong>?
          </DialogContentText>
          <DialogContentText variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Esta acción eliminará permanentemente la promoción.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button 
            onClick={handleCloseConfirmDialog}
            variant="outlined"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              padding: '6px 16px'
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleDeleteEvent}
            color="error"
            variant="contained"
            autoFocus
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              padding: '6px 16px'
            }}
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* NotificaTIONS*/}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="error" 
          onClose={handleCloseSnackbar}
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          onClose={handleCloseSnackbar}
          sx={{ width: '100%' }}
        >
          Promoción eliminada exitosamente
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EventCard;