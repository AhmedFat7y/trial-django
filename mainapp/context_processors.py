def debug_mode(request):
    from settings import DEBUG
    return {'DEBUG': DEBUG}