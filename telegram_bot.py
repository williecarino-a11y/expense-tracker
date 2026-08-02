from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

async def hello(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(f'Hello {update.effective_user.first_name}!')

if __name__ == '__main__':
    app = ApplicationBuilder().token("8916405095:AAFF5fj4ZDuiVwokpNVUfDyApBFE5-lc_2A").build()
    app.add_handler(CommandHandler("hello", hello))
    print("Bot is running...")    app.run_polling(connect_timeout=30, read_timeout=30)()
