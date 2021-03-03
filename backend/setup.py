from setuptools import setup
from setuptools import find_packages

setup(name='PurdueEats',
    install_requires=[
        'bcrypt>=3.2.0',
        'email_validator>=1.1.2',
        'fastapi>=0.63.0',
        'google-api-core>=1.26.0',
        'google-auth>=1.27.0',
        'google-auth-oauthlib>=0.4.2',
        'google-cloud-bigquery>=2.9.0',
        'google-cloud-core>=1.6.0',
        'google-crc32c>=1.1.2',
        'google-pasta>=0.2.0',
        'google-resumable-media>=1.2.0',
        'googleapis-common-protos>=1.52.0',
        'Keras-Preprocessing>=1.1.2',
        'numpy>=1.19.5',
        'passlib>=1.7.4',
        'pyarrow>=3.0.0',
        'pydantic>=1.7.3',
        'PyJWT>=2.0.1',
        'tensorflow>=2.4.1',
        'uvicorn>=0.13.3'
        ],
    package_data={'PurdueEats': ['README.md']},
    packages=find_packages())