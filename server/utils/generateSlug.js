import { PrismaClient } from "@prisma/client";

/**
 * Generate a unique slug from the given title.
 * If the slug already exists, append a number (e.g. -1, -2, etc.)
 *
 * @param {string} title - Blog title
 * @param {string} [excludeId] - Optional blog ID to exclude (for updates)
 * @returns {Promise<string>} - Unique slug
 */

const prisma = new PrismaClient();
export async function generateUniqueSlug(title, excludeId = null) {
    // Convert title to slug-friendly format
    const baseSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // remove special chars
        .replace(/\s+/g, "-") // spaces → hyphens
        .replace(/-+/g, "-"); // multiple hyphens → single

    let slug = baseSlug;
    let counter = 1;

    // Check if slug already exists
    while (true) {
        const existing = await prisma.blog.findFirst({
            where: {
                slug,
                ...(excludeId && { NOT: { id: excludeId } }),
            },
        });

        if (!existing) break;
        slug = `${baseSlug}-${counter++}`;
    }

    return slug;
}
