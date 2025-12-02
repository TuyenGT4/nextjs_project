import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

export default function DeleteManageRoomCategoriesModal({
  open,
  onClose,
  member,
  onSuccess,
  loading,
  setLoading,
}) {
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.API}/admin/roomtype/${member._id}`,
        {
          method: "DELETE",
        }
      );

      onSuccess(member._id);
      toast.success("Xóa loại phòng thành công");
    } catch (error) {
      toast.error("Không thể xóa loại phòng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn xóa {member?.name}? Hành động này không thể hoàn
          tác.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Hủy
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={loading}
          autoFocus
        >
          {loading ? "Đang xóa..." : "Xóa"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
