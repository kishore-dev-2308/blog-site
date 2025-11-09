import path from "path";
import fs from "fs/promises";
import logger from "../logs/winstonLog.js";

export const deletefile = async (path) => {
    try {
        await fs.access(path);
        await fs.unlink(path);
        logger.info(`✅ Deleted File: ${path}`);
        return true;
    } catch (err) {
        logger.warn(`⚠️ Could File (${path}): ${err.message}`);
        return false;
    }
}