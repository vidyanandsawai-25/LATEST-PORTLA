import React from "react";
import {
  CheckCircle,
  FileText,
  Upload,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { motion } from "motion/react";

interface NewGrievanceFormContentProps {
  formData: any;
  setFormData: (data: any) => void;
  userConnections: any[];
  handleConnectionSelect: (id: string) => void;
  selectedFiles: File[];
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleRemoveFile: (index: number) => void;
  onClose: () => void;
  handleSubmit: () => void;
  errors: {
    connectionId: string;
    complaintType: string;
    remark: string;
  };
}

export function NewGrievanceFormContent({
  formData,
  setFormData,
  userConnections,
  handleConnectionSelect,
  selectedFiles,
  handleFileChange,
  handleRemoveFile,
  onClose,
  handleSubmit,
  errors,
}: NewGrievanceFormContentProps) {
  return (
    <>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="flex-1 overflow-auto p-6 relative">
        {/* Two Column Info Section with Decorative Cards */}

        {/* Form Fields with Enhanced Styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-5 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-gray-200 shadow-lg"
        >
          {/* Connection Selection */}
          <div className="relative">
            <Label className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
                1
              </span>
              Select Water Connection{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.connectionId}
              onValueChange={handleConnectionSelect}
            >
              <SelectTrigger className="mt-1.5 h-11 bg-white border-2 border-purple-200 hover:border-purple-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all shadow-sm">
                <SelectValue placeholder="Choose your water connection" />
              </SelectTrigger>
              <SelectContent>
                {userConnections.length > 0 ? (
                  userConnections.map((connection) => (
                    <SelectItem
                      key={connection.id}
                      value={connection.id}
                    >
                      {connection.id} - {connection.address}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-connections" disabled>
                    No connections available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.connectionId && (
              <p className="text-xs text-red-500 mt-1">
                {errors.connectionId}
              </p>
            )}
          </div>

          {/* Complaint Type */}
          <div className="relative">
            <Label className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
                2
              </span>
              Type of Complaint{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.complaintType}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  complaintType: value,
                })
              }
              disabled={!formData.connectionId}
            >
              <SelectTrigger
                className={`mt-1.5 h-11 bg-white border-2 transition-all shadow-sm ${
                  !formData.connectionId
                    ? "opacity-50 cursor-not-allowed border-gray-200"
                    : "border-orange-200 hover:border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                }`}
              >
                <SelectValue placeholder="Select complaint category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="billing">
                  💳 Billing Issue
                </SelectItem>
                <SelectItem value="supply">
                  💧 Water Supply Issue
                </SelectItem>
                <SelectItem value="quality">
                  🔬 Water Quality Issue
                </SelectItem>
                <SelectItem value="leakage">
                  🚰 Leakage Problem
                </SelectItem>
                <SelectItem value="meter">
                  📊 Meter Issue
                </SelectItem>
                <SelectItem value="connection">
                  🔌 Connection Issue
                </SelectItem>
                <SelectItem value="pressure">
                  ⚡ Water Pressure
                </SelectItem>
                <SelectItem value="other">📝 Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.complaintType && (
              <p className="text-xs text-red-500 mt-1">
                {errors.complaintType}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="relative">
            <Label className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
                3
              </span>
              Describe your grievance{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              placeholder="Provide detailed description of your complaint including dates, times, and any relevant information that will help us resolve your issue..."
              rows={4}
              value={formData.remark}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  remark: e.target.value,
                })
              }
              disabled={!formData.connectionId}
              className={`mt-1.5 resize-none bg-white border-2 transition-all shadow-sm ${
                !formData.connectionId
                  ? "opacity-50 cursor-not-allowed border-gray-200"
                  : "border-cyan-200 hover:border-cyan-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
              }`}
            />
            <div className="flex justify-between items-center mt-1.5">
              <p className="text-xs text-gray-500">
                {formData.remark.length}/500 characters
              </p>
              {formData.remark.length > 450 && (
                <p className="text-xs text-orange-600 font-medium">
                  {500 - formData.remark.length} characters
                  remaining
                </p>
              )}
            </div>
            {errors.remark && (
              <p className="text-xs text-red-500 mt-1">{errors.remark}</p>
            )}
          </div>

          {/* File Upload with Enhanced Design */}
          <div className="relative">
            <Label className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
                4
              </span>
              Upload Supporting Documents
              <span className="text-xs font-normal text-gray-500 ml-auto">
                (Optional)
              </span>
            </Label>
            <div
              onClick={() =>
                !formData.connectionId
                  ? null
                  : document
                      .getElementById("file-upload")
                      ?.click()
              }
              className={`mt-1.5 border-2 border-dashed rounded-xl p-6 text-center transition-all relative overflow-hidden ${
                !formData.connectionId
                  ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                  : "border-emerald-300 bg-gradient-to-br from-emerald-50/50 via-teal-50/50 to-cyan-50/50 hover:border-emerald-400 hover:shadow-lg cursor-pointer"
              }`}
            >
              {/* Shine effect on hover */}
              {formData.connectionId && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/60 to-transparent rounded-full blur-2xl"></div>
              )}

              <motion.div
                animate={
                  formData.connectionId
                    ? {
                        y: [0, -5, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Upload
                  className={`w-10 h-10 mx-auto mb-3 ${
                    formData.connectionId
                      ? "text-emerald-500"
                      : "text-gray-400"
                  }`}
                />
              </motion.div>

              <p
                className={`text-sm font-medium mb-1 ${
                  formData.connectionId
                    ? "text-gray-800"
                    : "text-gray-500"
                }`}
              >
                Drop files here or click to browse
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Images (JPG, PNG), PDFs or Documents up to 10MB
                each
              </p>
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
                disabled={!formData.connectionId}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  document
                    .getElementById("file-upload")
                    ?.click();
                }}
                disabled={!formData.connectionId}
                className={`shadow-md ${
                  formData.connectionId
                    ? "border-2 border-emerald-400 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-500"
                    : ""
                }`}
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
            </div>

            {/* Selected Files with Beautiful Cards */}
            {selectedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 space-y-2"
              >
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Selected Files ({selectedFiles.length})
                </p>
                <div className="max-h-[140px] overflow-y-auto space-y-2 pr-2">
                  {selectedFiles.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border-2 border-blue-200 group hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate font-medium">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFile(index)}
                        className="h-8 w-8 p-0 opacity-60 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Important Note with Enhanced Styling */}
       
      </div>

      {/* Footer Buttons with Gradient */}
      <div className="border-t-2 border-gray-200 px-6 py-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 flex gap-3 justify-end shadow-lg">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="min-w-[120px] border-2 hover:bg-gray-100 shadow-md"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          className="min-w-[140px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
          disabled={
            !formData.connectionId ||
            !formData.complaintType ||
            !formData.remark
          }
        >
          {/* Shine animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 3,
            }}
          />
          <Plus className="w-4 h-4 mr-2 relative z-10" />
          <span className="relative z-10">Submit</span>
        </Button>
      </div>
    </>
  );
}