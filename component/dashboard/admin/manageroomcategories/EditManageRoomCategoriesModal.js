import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Modal,
  TextField,
  Stack,
  Button,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Avatar,
  Checkbox,
  ListItemText,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import RoomNumbersTable from "./RoomNumbersTable";

import { selectStyles, textFieldStyles } from "./styles";

export default function EditManageRoomCategoriesModal({
  open,
  onClose,
  member,
  onSuccess,
  loading,
  setLoading,
  fetchRooms,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fileInputRef = useRef(null);
  const bulkFileInputRef = useRef(null); // For bulk image upload

  const [bulkUploadProgress, setBulkUploadProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [editedMember, setEditedMember] = useState({
    name: "",
    total_adult: "",
    total_child: "",
    room_capacity: "",
    image: "",
    price: "",
    size: "",
    view: "",
    bed_style: "",
    discount: 0,
    short_desc: "",
    description: "",
    status: 0,
    roomNumber: "",
    room_id: "",
    roomtype_id: "",
    facilities: [],
    gallery_images: [], // Ensure this is initialized as an array
    room_numbers: [],
  });
  const [activeTab, setActiveTab] = useState(0);

  console.log("memberx==>", member);

  // View options
  const viewOptions = [
    "Hướng biển",
    "Hướng vườn",
    "Hướng núi",
    "Hướng phố",
    "Hướng bể bơi",
  ];

  const bedStyleOptions = [
    "Giường đơn",
    "Giường đôi",
    "Giường King",
    "Giường Queen",
    "Hai giường đơn",
    "Giường tầng",
  ];

  // Facility options
  const facilityOptions = [
    "WiFi miễn phí",
    "Bể bơi",
    "Điều hòa",
    "TV",
    "Minibar",
    "Két an toàn",
    "Dịch vụ phòng",
    "Bao gồm bữa sáng",
    "Giặt ủi",
    "Bãi đỗ xe",
    "Phòng gym",
    "Spa",
    "Thú cưng được phép",
    "Phòng dành cho người khuyết tật",
  ];

  useEffect(() => {
    if (member) {
      setEditedMember({
        name: member?.roomtype_id?.name || "",
        total_adult: member?.total_adult || "",
        total_child: member?.total_child || "",
        room_capacity: member?.room_capacity || "",
        image: member?.image || "",
        price: member?.price || "",
        size: member?.size || "",
        view: member?.view || "",
        bed_style: member?.bed_style || "",
        discount: member?.discount || 0,
        short_desc: member?.short_desc || "",
        description: member?.description || "",

        status: member?.status || 0,
        roomNumber: member?.roomNumber || "",
        room_id: member?._id || "",
        roomtype_id: member?.roomtype_id?._id || "",
        facilities: member?.facilities || [],
        gallery_images: member?.gallery_images || [], // Ensure this is initialized

        room_numbers: member?.room_numbers || [],
      });
      setSelectedFacilities(member?.facilities || []);
      if (member?.image) {
        setImagePreview(member.image);
      } else {
        setImagePreview("");
      }
    } else {
      setEditedMember({
        name: "",
        total_adult: "",
        total_child: "",
        room_capacity: "",
        image: "",
        price: "",
        size: "",
        view: "",
        bed_style: "",
        discount: 0,
        short_desc: "",
        description: "",
        status: 0,
        roomNumber: "",
        room_id: "",
        roomtype_id: "",
        facilities: [],
        room_numbers: [],
        gallery_images: [],
      });
      setSelectedFacilities([]);
      setImagePreview("");
    }
  }, [member]);

  console.log("member=======================", member);

  // Add this to your useEffect to initialize uploadedImages when member data is loaded
  useEffect(() => {
    if (member?.gallery_images) {
      setUploadedImages(member.gallery_images);
    }
  }, [member]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFacilityChange = (event) => {
    const {
      target: { value },
    } = event;
    const newFacilities = typeof value === "string" ? value.split(",") : value;
    setSelectedFacilities(newFacilities);
    setEditedMember((prev) => ({
      ...prev,
      facilities: newFacilities,
    }));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setEditedMember((prev) => ({
          ...prev,
          image: data.secure_url,
        }));
        toast.success("Đã tải lên hình ảnh thành công!");
      } else {
        throw new Error("Không thể tải lên hình ảnh");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Không thể tải lên hình ảnh");
      setImagePreview("");
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpdateMember = async () => {
    // Basic validation
    if (activeTab === 0 && (!editedMember.name || !member)) {
      toast.error("Vui lòng điền đầy đủ thông tin phòng");
      return;
    }
    if (activeTab !== 0 && !editedMember.roomNumber) {
      toast.error("Vui lòng nhập số phòng");
      return;
    }

    try {
      setLoading(true);

      const endpoint =
        activeTab === 0
          ? `${process.env.API}/admin/room/${member?._id}` // Room update
          : `${process.env.API}/admin/room/roomno`; // Room number create/update

      const method = activeTab === 0 ? "PUT" : "POST";

      const payload =
        activeTab === 0
          ? editedMember // Send all room data
          : {
              room_id: editedMember.room_id || member._id,
              roomtype_id: editedMember.roomtype_id,
              roomNumber: editedMember.roomNumber,
              status: editedMember.status?.toString() || "0",
            };

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      fetchRooms();
      const result = await response.json();
      onSuccess(result);
      toast.success(
        activeTab === 0
          ? "Cập nhật phòng thành công!"
          : "Lưu số phòng thành công!"
      );
    } catch (error) {
      console.error("Update error****:", error);
      toast.error(
        activeTab === 0 ? "Không thể cập nhật phòng" : "Không thể lưu số phòng"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBulkFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    try {
      setIsUploading(true);
      setBulkUploadProgress(0);

      const uploadedUrls = [];
      const totalFiles = files.length;
      let processedFiles = 0;

      for (const file of files) {
        try {
          // Create form data for each file
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "ml_default");

          // Upload to Cloudinary
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();
          if (data.secure_url) {
            uploadedUrls.push(data.secure_url);
          }

          processedFiles++;
          setBulkUploadProgress(
            Math.round((processedFiles / totalFiles) * 100)
          );
        } catch (error) {
          console.error("Error uploading image:", file.name, error);
          toast.error(`Không thể tải lên ${file.name}`);
        }
      }

      if (uploadedUrls.length) {
        setUploadedImages((prev) => [...prev, ...uploadedUrls]);
        setEditedMember((prev) => ({
          ...prev,
          gallery_images: [...prev.gallery_images, ...uploadedUrls],
        }));
        toast.success(
          `Đã tải lên ${uploadedUrls.length}/${totalFiles} hình ảnh thành công!`
        );
      }
    } catch (error) {
      console.log("Error in bulk upload:", error);
      toast.error("Tải lên hàng loạt thất bại");
    } finally {
      setIsUploading(false);
      setBulkUploadProgress(0);
    }
  };

  const triggerBulkFileInput = () => {
    bulkFileInputRef.current.click();
  };

  const removeImage = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    setEditedMember((prev) => ({
      ...prev,
      gallery_images: newImages,
    }));
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-team-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "90%" : 1200,
          maxWidth: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRadius: "16px",
          boxShadow: 24,
          p: isMobile ? 2 : 4,
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "12px",
            fontWeight: 700,
            fontSize: isMobile ? "1.25rem" : "1.75rem",
            color: "#1a202c",
          }}
        >
          Quản lý phòng
        </h2>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="room management tabs"
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons="auto"
          >
            <Tab label={isMobile ? "Danh mục" : "Danh mục phòng"} />
            <Tab label={isMobile ? "Phòng số" : "Số phòng"} />
          </Tabs>
        </Box>

        <Box sx={{ pt: 3 }}>
          {activeTab === 0 ? (
            <Grid container spacing={3}>
              {/* Row 1 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tên phòng"
                  name="name"
                  value={editedMember.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  {...textFieldStyles} // Spread the styles here
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số người lớn"
                  name="total_adult"
                  value={editedMember.total_adult}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  type="number"
                  {...textFieldStyles} // Spread the styles here
                />
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số trẻ nhỏ"
                  name="total_child"
                  value={editedMember.total_child}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  type="number"
                  {...textFieldStyles} // Spread the styles here
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Sức chứa"
                  name="room_capacity"
                  value={editedMember.room_capacity}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  {...textFieldStyles} // Spread the styles here
                />
              </Grid>

              {/* Row 3 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Giá"
                  name="price"
                  value={editedMember.price}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  {...textFieldStyles} // Spread the styles here
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">VND</InputAdornment>
                    ),
                  }}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Giảm giá (%)"
                  name="discount"
                  value={editedMember.discount}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  type="number"
                  {...textFieldStyles} // Spread the styles here
                />
              </Grid>

              {/* Row 4 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Diện tích"
                  name="size"
                  value={editedMember.size}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  {...textFieldStyles} // Spread the styles here
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">m²</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  size="small"
                  sx={selectStyles.formControl.sx}
                >
                  <InputLabel>View</InputLabel>
                  <Select
                    name="Hướng nhìn"
                    value={editedMember.view}
                    onChange={handleInputChange}
                    label="View"
                    sx={selectStyles.select.sx}
                  >
                    {viewOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Row 5 */}
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  size="small"
                  sx={selectStyles.formControl.sx}
                >
                  <InputLabel>Bed Style</InputLabel>
                  <Select
                    name="bed_style"
                    value={editedMember.bed_style}
                    onChange={handleInputChange}
                    label="Loại giường"
                    sx={selectStyles.select.sx}
                  >
                    {bedStyleOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  size="small"
                  sx={selectStyles.formControl.sx}
                >
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={editedMember.status}
                    onChange={handleInputChange}
                    label="Trạng thái"
                    sx={selectStyles.select.sx}
                  >
                    <MenuItem sx={selectStyles.menuItem.sx} value={0}>
                      Không hoạt động
                    </MenuItem>
                    <MenuItem sx={selectStyles.menuItem.sx} value={1}>
                      Hoạt động
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Row 6 - Facilities */}
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  size="small"
                  sx={selectStyles.formControl.sx}
                >
                  <InputLabel style={selectStyles.inputLabel}>
                    Tiện nghi
                  </InputLabel>
                  <Select
                    multiple
                    name="facilities"
                    value={selectedFacilities}
                    onChange={handleFacilityChange}
                    label="Tiện nghi"
                    renderValue={(selected) => selected.join(", ")}
                    sx={selectStyles.select.sx}
                  >
                    {facilityOptions.map((facility) => (
                      <MenuItem
                        key={facility}
                        value={facility}
                        sx={selectStyles.menuItem.sx}
                      >
                        <Checkbox
                          sx={selectStyles.checkbox.sx}
                          checked={selectedFacilities.indexOf(facility) > -1}
                        />
                        <ListItemText primary={facility} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Row 7 - Image Upload */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {imagePreview && (
                    <Avatar
                      src={imagePreview}
                      alt="Room Preview"
                      sx={{ width: 200, height: 200 }}
                      variant="rounded"
                    />
                  )}
                  <Box>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <Button
                      variant="contained"
                      onClick={triggerFileInput}
                      disabled={isUploading || loading}
                      sx={{
                        mb: 2,
                        color: "white",
                        backgroundColor: "#8A12FC",
                        "&:hover": { backgroundColor: "#7a0eeb" },
                      }}
                    >
                      {isUploading ? "Đang tải lên..." : "Tải lên ảnh"}
                    </Button>
                  </Box>
                </Box>
              </Grid>

              {/* Row 8 - Short Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mô tả ngắn"
                  name="short_desc"
                  value={editedMember.short_desc}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={2}
                  {...textFieldStyles} // Spread the styles here
                />
              </Grid>

              {/* Row 9 - Full Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mô tả đầy đủ"
                  name="description"
                  value={editedMember.description}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={4}
                  {...textFieldStyles} // Spread the styles here
                />
              </Grid>

              {/* New Row - Bulk Image Upload */}
              <Grid item xs={12}>
                <Box sx={{ mt: 2 }}>
                  <input
                    type="file"
                    ref={bulkFileInputRef}
                    onChange={handleBulkFileChange}
                    accept="image/*"
                    style={{ display: "none" }}
                    multiple
                  />
                  <Button
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    onClick={triggerBulkFileInput}
                    disabled={isUploading || loading}
                    fullWidth
                    sx={{
                      mb: 2,
                      color: "white",
                      backgroundColor: "#8A12FC",
                      "&:hover": { backgroundColor: "#7a0eeb" },
                    }}
                  >
                    Tải lên hàng loạt ảnh
                  </Button>

                  {bulkUploadProgress > 0 && bulkUploadProgress < 100 && (
                    <Box sx={{ width: "100%", mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>Đang tải lên...</span>
                        <span>{bulkUploadProgress}%</span>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          height: 8,
                          bgcolor: "grey.200",
                          borderRadius: 4,
                        }}
                      >
                        <Box
                          sx={{
                            width: `${bulkUploadProgress}%`,
                            height: "100%",
                            bgcolor: "primary.main",
                            borderRadius: 4,
                          }}
                        />
                      </Box>
                    </Box>
                  )}

                  {uploadedImages.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {uploadedImages.map((img, index) => (
                          <Box
                            key={index}
                            sx={{
                              position: "relative",
                              border: "5px solid #8A12FC", // Purple border
                              borderRadius: 2, // Matches Avatar's rounded variant
                              p: 0.5, // Padding inside the border
                              transition: "all 0.3s ease", // Smooth hover effect
                              "&:hover": {
                                boxShadow: "0 0 0 2px rgba(138, 18, 252, 0.3)", // Glow effect
                                transform: "scale(1.02)", // Slight zoom
                              },
                            }}
                          >
                            <Avatar
                              src={img}
                              alt={`Gallery Preview ${index + 1}`}
                              sx={{
                                width: 100,
                                height: 100,
                                boxShadow: 1, // Subtle shadow on the image
                              }}
                              variant="rounded"
                            />
                            <IconButton
                              size="small"
                              onClick={() => removeImage(index)}
                              sx={{
                                position: "absolute",
                                top: -12, // Adjusted position
                                right: -12, // Adjusted position
                                bgcolor: "#8A12FC", // Using your purple color
                                color: "white",
                                border: "2px solid white", // White border for contrast
                                boxShadow: 2, // Shadow for depth
                                "&:hover": {
                                  bgcolor: "#6a0bc7", // Darker purple on hover
                                  transform: "scale(1.1)", // Slight grow effect
                                },
                                transition: "all 0.2s ease", // Smooth transition
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          ) : (
            <>
              <RoomNumbersTable
                editedMember={editedMember}
                setEditedMember={setEditedMember}
                handleInputChange={handleInputChange}
                handleAddRoomNumberSubmit={handleUpdateMember}

                // if you have a submit handler
              />
            </>
          )}

          {activeTab === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <Button
                fullWidth={isMobile}
                variant="outlined"
                onClick={onClose}
                sx={{ borderRadius: "12px" }}
                disabled={loading}
                size={isMobile ? "small" : "medium"}
              >
                Cancel
              </Button>
              <Button
                fullWidth={isMobile}
                variant="contained"
                onClick={handleUpdateMember}
                sx={{
                  backgroundColor: "#8A12FC",
                  "&:hover": { backgroundColor: "#7a0eeb" },
                }}
                disabled={loading || isUploading}
                size={isMobile ? "small" : "medium"}
              >
                {loading
                  ? isMobile
                    ? "Đang lưu..."
                    : "Đang lưu thay đổi..."
                  : isMobile
                  ? "Lưu"
                  : "Lưu thay đổi"}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
