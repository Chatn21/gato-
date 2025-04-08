const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Eliminar usuario por UID
exports.deleteUserById = functions.https.onCall(async (data, context) => {
  const uid = data.uid;

  try {
    await admin.auth().deleteUser(uid);
    return { success: true, message: `Usuario ${uid} eliminado correctamente` };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// Actualizar correo u otros datos del usuario
exports.updateUserById = functions.https.onCall(async (data, context) => {
  const { uid, email, displayName, phoneNumber } = data;

  const updateData = {};
  if (email) updateData.email = email;
  if (displayName) updateData.displayName = displayName;
  if (phoneNumber) updateData.phoneNumber = phoneNumber;

  try {
    const updatedUser = await admin.auth().updateUser(uid, updateData);
    return { success: true, message: `Usuario ${uid} actualizado correctamente`, user: updatedUser };
  } catch (error) {
    return { success: false, message: error.message };
  }
});
