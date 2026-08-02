from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

TOKEN = "8916405095:AAGu8V3aLJY5vA56UsYDFGOMzOHespg5kgM"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Hello! I'm alive.")

app = Application.builder().token(TOKEN).build()
app.add_handler(CommandHandler("start", start))

application.run_polling(read_timeout=30, write_timeout=30)
